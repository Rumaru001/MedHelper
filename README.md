# MedHelper
NULP student project

## Installation
  
  1. In that folder create a local interpenter using [pyenv](https://github.com/pyenv/pyenv#installation). If you don`t have python 3.8.6, please install it via pyenv
  ```
  pyenv install 3.8.6
  ```
  2. If you don`t have poetry, install it, using python interpreter (cmd/terminal...)
  ```
  pip install poetry
  ```
  3. Using poetry create a new virtual environment (3.8 - you must paste a path to your pyenv python 3.8.6)
  ```
  poetry env use 3.8.6
  poetry env use C:\Users\username\.pyenv\pyenv-win\versions\3.8.6
  ```
  4. Activate venv adn install requirements
  ```
  poetry shell
  poetry install
  ```
  5. You must install [Node.js](https://nodejs.org/uk/download/) and [yarn](https://classic.yarnpkg.com/ru/docs/install/#windows-stable) 
  
  6. In terminal go to .\MedHelper\react. Install requirements for react
  ```
  yarn install
  ```
  7. Build react project
  ```
  npm run build
  ```
  8. Install .env (environment variables) from TG Channel and paste into .\MedHelper\med_project\med_project\
  9. Run project
  ```
  python manage.py makemigrations
  python manage.py migrate
  python manage.py runserver
  ```
