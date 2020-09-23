# Exercise 5 - Create extensions to get Additional Services

## Introduction - Scenario
In this exercise you will get introduced to the Serverless functionality of Kyma and how to expose them via OAuth2 secured API. 
This exercise will continue to use our web application created in the previous exercise, it will be modified replacing the local functions to call the new Kyma Serverless Services exposed.
The exercise 4, also generated a ready to use Docker image of the web application, which can led you to focus on the Kyma activities

The goal is to create new Serverless functions and secure them via OAuth2 API using your *project: "Kyma"* installation.

### You Will Learn How to: 

- Add an Addon for Redis to the Catalog of the *project: "Kyma"*
- Create a new instance of the Addon 
- Bind the instance of the Redis Addon to the Serverless function
- Consume redis service to add and read keys inside the lambda

## Steps