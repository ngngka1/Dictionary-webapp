FROM python:3.10-alpine

WORKDIR /app

COPY base/requirements.txt /app

RUN pip install --no-cache-dir -r requirements.txt

# copy base folder
COPY base /app/base
# copy dictionary_backend folder
COPY dictionary_backend /app/dictionary_backend
# copy user login api folder
COPY user_api /app/user_api

# Other files
COPY Pipfile /app/
COPY Pipfile.lock /app/
COPY manage.py /app/

RUN python manage.py makemigrations
RUN python manage.py migrate


EXPOSE 8000
