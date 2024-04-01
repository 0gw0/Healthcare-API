import time
import pika
# from os import environ

hostname = "localhost" # default hostname
port = 5672            # default port
exchangename = "order_topic" # exchange name
exchangetype = "topic" # - use a 'topic' exchange to enable interaction

# Instead of hardcoding the values, we can also get them from the environ as shown below
# hostname = environ.get('hostname') #localhost
# port = environ.get('port')         #5672 
# exchangename = environ.get('exchangename') #order_topic
# exchangetype = environ.get('exchangetype') #topic
# a_queue_name = environ.get('a_queue_name') #Activity_Log
# e_queue_name = environ.get('e_queue_name') #Error

#to create a connection to the broker
def create_connection(max_retries=12, retry_interval=5):
    print('amqp_setup:create_connection')
    
    retries = 0
    connection = None
    
    # loop to retry connection upto 12 times with a retry interval of 5 seconds
    while retries < max_retries:
        try:
            print('amqp_setup: Trying connection')
            # connect to the broker and set up a communication channel in the connection
            connection = pika.BlockingConnection(pika.ConnectionParameters
                                (host=hostname, port=port,
                                 heartbeat=3600, blocked_connection_timeout=3600)) # these parameters to prolong the expiration time (in seconds) of the connection
                # Note about AMQP connection: various network firewalls, filters, gateways (e.g., SMU VPN on wifi), may hinder the connections;
                # If "pika.exceptions.AMQPConnectionError" happens, may try again after disconnecting the wifi and/or disabling firewalls.
                # If see: Stream connection lost: ConnectionResetError(10054, 'An existing connection was forcibly closed by the remote host', None, 10054, None)
                # - Try: simply re-run the program or refresh the page.
                # For rare cases, it's incompatibility between RabbitMQ and the machine running it,
                # - Use the Docker version of RabbitMQ instead: https://www.rabbitmq.com/download.html
            print("amqp_setup: Connection established successfully")
            break  # Connection successful, exit the loop
        except pika.exceptions.AMQPConnectionError as e:
            print(f"amqp_setup: Failed to connect: {e}")
            retries += 1
            print(f"amqp_setup: Retrying in {retry_interval} seconds...")
            time.sleep(retry_interval)

    if connection is None:
        raise Exception("amqp_setup: Unable to establish a connection to RabbitMQ after multiple attempts.")

    return connection

def create_channel(connection):
    print('amqp_setup:create_channel')
    channel = connection.channel()
    # Set up the exchange if the exchange doesn't exist
    print('amqp_setup:create exchange')
    channel.exchange_declare(exchange=exchangename, exchange_type=exchangetype, durable=True) # 'durable' makes the exchange survive broker restarts
    return channel

#function to create queues
def create_queues(channel):
    print('amqp_setup:create queues')
    create_notif_queue(channel)
    

# function to create_notif_queue   
def create_notif_queue(channel):
    print('amqp_setup:create_medical_certificate_queue')
    a_queue_name = 'medical_certificate'
    channel.queue_declare(queue=a_queue_name, durable=True) # 'durable' makes the queue survive broker restarts
    channel.queue_bind(exchange=exchangename, queue=a_queue_name, routing_key='#')
        # bind the queue to the exchange via the key
        # 'routing_key=#' => any routing_key would be matched



if __name__ == "__main__":  # execute this program only if it is run as a script (not by 'import')   
    connection = create_connection()
    channel = create_channel(connection)
    create_queues(channel)
    
    