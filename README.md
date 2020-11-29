# MedHelper
NULP student project

## Installation
  
  1. In that folder create a local interpenter using [pyenv](https://github.com/pyenv/pyenv#installation)  
  ```
  pyenv install 3.8.3
  pyenv local 3.8.3
  pyenv init
  ```
  2. Install poetry
  ```
  pip install poetry
  ```
  3. Using poetry create a new virtual enviroment and install all requirements  
  ```
  poetry env use 3.8
  poetry shell
  ```
  4. Install requirements for pyhton
  ```
  poetry self update
  poetry install
  ```
  5. Install requirements for react
  ```
  yarn install
  ```
  6. Build react project
  ```
  npm run build
  ```
  7. Run project
  ```
  python manage.py migrate
  python manage.py runserver
  ```
