# Run Project "Kyma" on a Hyperscaler

**This enablement content is for Devtoberfest Week 7: 05 October → 09 October 2020.**

As part of Devtoberfest enablement for Kyma we wanted to show you how you can run and install Kyma on a hyperscaler of your choice.  To do this we will walk you through another open source project SAP has released called project Gardener. While this system can be installed by you, SAP has a hosted and managed version we will used for these demo examples.

## Details

### Project Gardener

You can install your own version of Gardener on the hyperscaler of your choice or even on a local system like openstack.  These same options can be available when you want to deploy a cluster on your gardener system.  
![](https://github.com/SAP-samples/kyma-runtime-virtual-event/blob/master/exercises/02/gardener_cluster_deploy_types.png)
Once you have browsed the main website here: (https://gardener.cloud/) have a look at the documentaton page for concepts, setup guides and tutorials here (https://gardener.cloud/documentation/home/)



### Project Kyma

As referenced on our main page for this enablement, Kyma is available for you to install locally.  Here are the prerequsites for a cluster install like the one this video showcases. (https://kyma-project.io/docs/#installation-install-kyma-on-a-cluster-prerequisites) 

In the video for this exercise we show you how to deploy Kyma on two of the 5 hyperscaler environments offered in an SAP managed Gardener system.  
![](https://github.com/SAP-samples/kyma-runtime-virtual-event/blob/master/exercises/02/gardener_cluster_aws_status.png)
![](https://github.com/SAP-samples/kyma-runtime-virtual-event/blob/master/exercises/02/gardener_cluster_gcp_status.png)


### Things to keep in mind

This session references deploying Gardener and Kyma on your own, but if you are an SAP Cloud Platform customer we already offer you the ability to deploy the SAP Cloud Platform, Kyma runtime.  Please see this blog post (https://blogs.sap.com/2020/05/13/sap-cloud-platform-extension-factory-kyma-runtime-how-to-get-started/) for instructions on activating Kyma on a prodcution  SAP Cloud Platform system


### Dashboard and Cockpit explanations

Here is the section where your active gardener cluster allows you to access external tools, in this case a catalog of application choices.
![](https://github.com/SAP-samples/kyma-runtime-virtual-event/blob/master/exercises/02/gardener_cluster_external_service_catalog.png)

Once you have deployed Gardner and Kyma you will have the ability to deploy applications and monitor the status of your clusters.  
![](https://github.com/SAP-samples/kyma-runtime-virtual-event/blob/master/exercises/02/kyma_catalog_tile_choice.png)

After selecting the Kyma tile from the App page you will be taken to a deployment section, click on the deploy button.  
![](https://github.com/SAP-samples/kyma-runtime-virtual-event/blob/master/exercises/02/kyma_catalog_deploy_description.png)

To deploy Kyma you will need to select the "default" domain in the upper right hand drop down.  
![](https://github.com/SAP-samples/kyma-runtime-virtual-event/blob/master/exercises/02/kyma_deploy_select_namespace.png)

You will then need to scroll to the bottom of the page and click on submit.  
![](https://github.com/SAP-samples/kyma-runtime-virtual-event/blob/master/exercises/02/kyma_deploy_submit_button.png)

There will be a few lines of status that hide things like the random login password for your Kyma console.  
![](https://github.com/SAP-samples/kyma-runtime-virtual-event/blob/master/exercises/02/kyma_login_user.png)

Once your Kyma system is deployed your deployment screen will show all the Kyma components that were installed.  You will then be able to login to the console and deploy applications, add user roles, etc. onto your cluster.
![](https://github.com/SAP-samples/kyma-runtime-virtual-event/blob/master/exercises/02/kyma_apps_on_gardener_cluster.png)


Good luck and have fun!
