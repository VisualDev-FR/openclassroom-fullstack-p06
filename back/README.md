# MDD - Backend

# Requirements

* Java 11+
* maven 3+
* MySQL

# Configure the server

* provide a secret key in the environnement variable `$SECRET_KEY`
* create a database in MYSQL, then store his name in an environnement variable nammed `$DB_NAME`
* store the credentials of a user in MySql which have access to the database created previously, to do that you must provide two environnement variables: `$DB_USERNAME` and `DB_PASSWORD`

see [application.properties](./src/main/resources/application.properties) for more details

# Setup the project for local development

```bash
# clone the repository
git clone https://github.com/VisualDev-FR/openclassroom-fullstack-p06.git

# navigate to the directory 'back'
cd <repository path>/back

# install maven packages
mvn clean install
```

# Development server

To start a local development server, run:

```bash
mvn spring-boot:run
```
