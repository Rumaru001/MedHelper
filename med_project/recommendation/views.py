from background_task import background
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
import pandas as pd
from django.shortcuts import get_object_or_404
from assignment.models import Assignment, Specification
from account.models import get_user_by_type
from med_project.settings import BASE_DIR
from django.db.models import F
import numpy as np

from datetime import date, timedelta


class HeartDisease():

    def __init__(self) -> None:
        df = pd.read_csv(BASE_DIR / 'recommendation/heart.csv')
        df = df.loc[:, ['cp', 'exang', 'thalach', 'sex', 'age', 'target']]

        random_state = 0

        X, y = df.drop(columns=['target']), df.loc[:, 'target']
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, random_state=random_state)

        scaler = MinMaxScaler().fit(X_train)
        X_train_scaled = scaler.transform(X_train)
        X_test_scaled = scaler.transform(X_test)

        self.scaler = scaler
        self.data_is_prepared = False

        clf = SVC(random_state=random_state, C=10, gamma=0.1,
                  degree=2).fit(X_train_scaled, y_train)
        print(clf.predict(X_test_scaled))
        print(clf.score(X_test_scaled, y_test))

        self.clf = clf

    def prepare_data(self):

        # not a bug!!! mark all assignmets as used_for_prediction event it was skiped in forloop
        assignments = Assignment.objects.filter(
            specification_id=get_object_or_404(Specification, name="Cardiology").id,  used_for_prediction=False, creator_id=F('user_id')).all()

        self.assignments = assignments

        data = []

        dict_ = {
            "typical angina": 0,
            "atypical angina": 1,
            "non-anginal pain ": 2,
            "asymptomatic": 3,
            "M": 1,
            "F": 0
        }

        for assignment in assignments:
            try:
                user = get_user_by_type(assignment.user)
                extraData = assignment.data.data

                age = (date.today() - user.birth_date).days // 365.25

                data.append([user.user_id,
                             dict_.get(extraData["cp"], 4),
                             int(extraData["exang"]),
                             int(extraData["thalach"]),
                             dict_.get(user.sex, 1),
                             int(age)
                             ])
            except:
                continue

        df = pd.DataFrame(
            columns=['id', 'cp', 'exang', 'thalach', 'sex', 'age'], data=data)

        self.df = df
        self.data_is_prepared = True
        return df

    def predict(self, callback=None):
        '''
        Predicted results type: [(id, 1 or 0), ...] \n
        Predictions resauls is also passed to callback as **kwargs (predictions)
        '''
        if not self.data_is_prepared:
            self.prepare_data()

        X = self.df.iloc[:, 1:]

        if X.size < 1:
            return list()

        print(X.head())

        predictions = list(
            zip(self.df.loc[:, 'id'].tolist(), self.clf.predict(self.scaler.transform(X)).tolist()))

        self.assignments.update(used_for_prediction=True)

        if not callback is None:
            callback

        return predictions
