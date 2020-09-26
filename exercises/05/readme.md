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

### Create new deployment file for our AddOn

For this exercise, we will continue to use the project number-generator-service to store our kyma deployment files.
Let's create our new yaml in the src folder, containing the new addon definition file! - Use your CLI to navigate to the project base and create a file called *redisaddon.yaml*:

```
touch redisaddon.yaml
```

1. vim redisaddon.yaml
2. select the **i** key to insert a new line at the top of the file.
3. Add the following content to the file

```yaml 
apiVersion: addons.kyma-project.io/v1alpha1
kind: AddonsConfiguration
metadata:
  name: redis-addon
  namespace: devktoberfest
spec:
  reprocessRequest: 0
  repositories:
    - url: https://github.com/kyma-project/addons/releases/download/0.12.0/index-testing.yaml
```

4. Type ```:wq``` and select the Enter key to save the changes.

In the metadata above, we are defining a new AddonsConfiguration object to kyma.
* We have defined the name as *redis-addon* into the devktoberfest namespace
* The definition of the redis service and provisioning is defined by the repositories tag, inside the spec, it is referring to the URL where the file index-testing.yaml file exists. 

To deploy our new addon, let's use kubectl command as following:
```
kubectl apply -f redisaddon.yaml -n devktoberfest
```

Don't forget to inform the namespace when you are applying the file. If you do not define the namespace in the kubectl command, it will take the definition from the yaml file, and if it's not defined either, then it will deploy your objects into the "default" namespace.
To check the status of Addon deployment type the following command:

```
kubectl get addons redis-addon -n devktoberfest -o=jsonpath="{.status.phase}"
```

The *status.phase* must be equal to *Ready* to start to use.
No, we have added to our AddOn catalog, an offer of a Redis service.
To be able to use the service we need to create a new Service Instance of the addon and binding it to our lambda services.

Open the Kyma Console UI and go to the Menu Catalog -> AddOns, then you can see the Redis offer as the image below:

![kyma-runtime-virtual-event-05-01](kyma-runtime-virtual-event-05-01.png)

Let's create our new Redis service instance.

Edit our redisaddon.yaml file, and append the following metadata to the bottom of the service.

```yaml
---
apiVersion: servicecatalog.k8s.io/v1beta1
kind: ServiceInstance
metadata:
  name: numbers-redis-service
  namespace: devktoberfest
spec:
  serviceClassExternalName: redis
  servicePlanExternalName: micro
  parameters:
    imagePullPolicy: Always
``` 

A Service Instance of our addon was defined with the name number-redis-service inside the devktoberfest namespace.
With this spec section we have to Kyma, that our Redis instance will use the *micro* service plan, that means that is a in-memory persistence. 

> The name of the service can be whatever you want, but it makes sense to give it a name which represents what it is.   

Type ```:wq``` and select the Enter key to save the changes.

> Remember that we need to use *---* line as a separator between the objects declaration inside the yaml file

Deploy the service instance to Kyma using the following command: 
 
```
 kubectl apply -f redisaddon.yaml -n devktoberfest
 ```

You can see the following output on the deployment

````shell script

````
