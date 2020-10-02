# Exercise 6 - Prepare your Kyma environment for Scale

## Introduction - Scenario
In this exercise you will learn the basics of scaling in Kyma. We will be using the Kubernetes built in featues to scale the application.
Additionally we will be using the Kubernetes "rolling restart" features to restart a scaled application under load. 
The Sample application in use is part of this source code repository and is already uploaded to Docker Hub. Deployment.yaml manifests have been adapted.

### Pre-Requisites
- working Kyma installation
- kubectl command-line tools 
- activated kubeconfig to access the cluster via command-line. <br>
In case you don't have any command-line tools installed you can still follow along this guide up to Step 8. Step 8 you will need the command-line tools installed to finish.


### You Will Learn How to: 
- Scale your application and make use of Kubernetes scaling features and the collaborative orchestration of Kyma's service mesh and API Rules
- What it means from Kubernetes and Kyma perspective if you scale down your application to zero replicas
- How to use Kubenetes' rolling restart feature to restart you app while keeping the current scaling settings

## Steps

### Application code
The application code is not building upon previous exercises. You can build and dockerize yourself or just use the prepared image together with the deployment.yaml descriptor in the repository. 
If you want to dockerize and build the application yourself, please refer to the instructions in Exercise 03.


1) ### Create Your namespace

    Please create a namespace to isolate your workloads from other exercises. <br>
    Name your namspace "exercise06".

    | # |Console  | Command Line  |
    |---|---|---|
    |Step 1| ![exercise_06_namespace](exercise_06_namespace.png)<br>*Namespaces -> Add new namespace*   |  ```$ kubectl create namespace exercise06``` |


2) ### Deploy the Application
    You can now deploy the application in your namespace. If you have created your namespace using the Console application then the namespace is already activated. All resources you deploy now are scoped to your new namespace. 
    If you use the command-line make sure you refer to the newly created namespace; otherwise, the changes might be applied to the default one.

    | #| Console  | Command Line  |
    |---|---|---|
    | Step 1| ![exercise_06_deploy](exercise_06_deploy.png)<br>*Configuration -> Resources --> Deploy new resource   |  ```$ kubectl -n exercise06 apply -f deployment.yaml``` |
    | Step 2| ![exercise_06_dheck_deployment](exercise_06_check_deployment.png)<br>*Operation -> Deployments*|  ```$ kubectl -n exercise06 get deployments``` |
    | Step 3| ![exercise_06_check_replicasets](exercise_06_check_replicasets.png)<br>*Operation -> ReplicaSets*  |  ```$ kubectl -n exercise06 get replicasets``` |
    | Step 4| ![exercise_06_check_pods](exercise_06_check_pods.png)<br>*Operation -> Pods*  |  ```$ kubectl -n exercise06 get pods``` |
    | Step 5| ![exercise_06_check_services](exercise_06_check_services.png)<br>*Operation -> Services*  |  ```$ kubectl -n exercise06 get services``` |

3) ### Create API rule to expose the application to the public
    In order to expose the application to the public you can use the API Rule feature to quickly expose an ingress service. We don't need any authentication nor authorization, hence, we will select the "noop" access strategy to simply pass through directly to our application.
    | #| Console  | Command Line  |
    |---|---|---|
    | Step 1| ![exercise_06_apirules](exercise_06_apirules.png)<br>*Configuration -> API Rules   |  ```$ kubectl -n exercise06 get apirules``` |
    | Step 2| ![exercise_06_create_apirule](exercise_06_create_apirule.png)<br>*Configuration -> API Rules --> Create API Rule*|  ```$ kubectl -n exercise06 apply apirule.yaml```|
    
4) ### Use the application
    You can now use the sample application. Since you only have one instance of it running, you will just see one histogram.<br>
    ![exercise_06_use_app](exercise_06_use_app.png)


5) ### Scale your deployment up
    You can edit your deployment in two ways:
    1) Using Console application in Operation -> Deployments. Just edit your deployment and change the "spec.replicas" value to an integer value **> 1**
    2) Use <i>kubectl apply</i> to apply the target state of your changed deployment.yaml file

6) ### Scale your deployment down
    Similar to Number 5 you can also scale your replicas down. Every integer value **> 0** will produce a working deployment.<br>

7) ### Scale your deployment to zero
    If you change your deployment replcias to "0", then there would be no apps running in your upstream but the API rule is still intact. 

8) ### Practice and study rolling restart
    To study how the rolling restart feature of Kubernetes and Kyma works please:
    1) Scale your application to 3 replicas
    2) Use the Sample app to produce some load using the **Click me for continuous number stream** button
    3) After some time multiple histograms are shown and will be continuously updating
    4) Initiate the rolling restart using kubectl command-line ```$ kubectl -n exercise06 rollout restart deployment number-generator``` <br>
    You would see new replicas and therefore new histograms appearing similar to this picture: <br>
    ![exercise_06_fresh_replicas](exercise_06_fresh_replicas.png)



I hope you enjoyed this exercise. This is only the tip of the iceberg of all available operational features of Kubernetes and Kyma.
