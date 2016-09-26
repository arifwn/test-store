
Test Ecommerce Store
====================

Demo URL: http://belethor.sainsmograf.com/

Test Credentials:
- super user: `admin:insecure`
- normal user: `test:insecure`


Setup
-----

- Requirements: Python 3.5, virtualenv, Nodejs v6.6
- Setup
    - go to `src/web` directory: `cd src/web`
    - install python dependencies: `pip install -r requirements.txt`
    - install node.js dependencies: `npm install`
    - initialize database: `./manage.py migrate`
    - load initial databasa fixtures: `./manage.py loaddata dummy.json`
    - run test server: `./manage.py runserver 8888`
    - open http://localhost:8888/ on your web browser
    - administrative interface can be accessed using super user credential at http://localhost:8888/admin/
