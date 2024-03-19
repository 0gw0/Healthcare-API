FROM python:3-slim
WORKDIR /usr/src/app/delivery_order_microservice
COPY requirements.txt ./
RUN python -m pip install --no-cache-dir -r requirements.txt
COPY ["delivery_order.py", "./"]
COPY ["database", "./database"]
CMD [ "python", "-u", "./delivery_order.py" ]