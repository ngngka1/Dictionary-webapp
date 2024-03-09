FROM python:3.10

WORKDIR /app

COPY base/requirements.txt /app

RUN pip install --no-cache-dir -r requirements.txt

# copy base folder
COPY base /app/base

# copy dictionary_backend folder
COPY dictionary_backend /app/dictionary_backend

EXPOSE 8000
