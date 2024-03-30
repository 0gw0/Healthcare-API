# Deliver Order Microservice

To create Deliver Orders.

We will not be exploring anything beyond. This is because our project scope does not track delivery status.

### Functions

1. Create database with existing dataset template
2. 1 data type - Delivery Order
3. CRUD operations
    1. CREATE a delivery order
    2. GET all delivery order

### How to code

Ensure that the relevant VSCode extensions are installed

1. SQLite Viewer

Watch this tutorial to [learn SQLite](https://www.youtube.com/watch?v=pd-0G0MigUA)

Helpful Documentations

1. [List of HTTP status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

2. [SQLite Datatypes and its Corresponding Python Types](https://www.geeksforgeeks.org/sqlite-datatypes-and-its-corresponding-python-types/)

3. [How to correctly set AUTO INCREMENT fo a column in SQLite, using Python?](https://stackoverflow.com/questions/7905859/is-there-auto-increment-in-sqlite)

4. [How can I get dict from sqlite query?](https://stackoverflow.com/questions/3300464/how-can-i-get-dict-from-sqlite-query)

5. [Python string interpolation](https://www.programiz.com/python-programming/string-interpolation#google_vignette)

6. [Importing files from different folder](https://stackoverflow.com/questions/4383571/importing-files-from-different-folder)

7. [Creating database file one directory above current](https://stackoverflow.com/questions/36784897/creating-database-file-one-directory-above-current)

8. [Docker COPY multiple files](https://stackoverflow.com/questions/30256386/how-to-copy-multiple-files-in-one-layer-using-a-dockerfile)

9. [Docker Python app prints](https://stackoverflow.com/questions/29663459/why-doesnt-python-app-print-anything-when-run-in-a-detached-docker-container)

#### (WINDOWS) Run the code in this directory:

```BASH
    python3 -m venv .venv
    .venv\Scripts\activate
    pip install -r requirements.txt
    python delivery_order.py
```

#### (DOCKER) Run the code in docker:

```BASH
    docker build -t yata/delivery_order:1.0 ./
    docker run -p 5006:5006 --name delivery_order_microservice yata/delivery_order:1.0
```

### Postman Testing

Import the Postman scripts and test using the correct environment and dataset
