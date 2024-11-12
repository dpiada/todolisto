FROM python:3.12-slim-bookworm

WORKDIR /app

RUN pip install fastapi[all] --no-warn-script-location

COPY . .

RUN pip install -r requirements.txt

EXPOSE $PORT

ENTRYPOINT ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8080", "--reload"]
