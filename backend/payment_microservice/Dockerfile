FROM python:3-slim
WORKDIR /usr/src/app/payment_microservice
COPY requirements.txt ./
RUN python -m pip install --no-cache-dir -r requirements.txt
COPY ["payment.py", "./"]
COPY ["database", "./database"]
CMD [ "python", "-u", "./payment.py" ]