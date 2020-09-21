# Exercise 1 - Setup a local Kyma installment

## Steps

In this exercise we're going to show you, how you setup a local **project: "Kyma"** installment, for both Windows and MacOS.

The official reference documentation can be found on [kyma-project.io](https://kyma-project.io/docs/#installation-installation) and a more detailed installation Guide on the [Kyma-CLI GitHub Repository](https://github.com/kyma-project/cli/blob/master/docs/04-01-installation.md).

Before you get started installing all the necessary components, please make sure you fullfill the hardware requirements for a local Kyma installation.

The hardware requirements are:

> By default, the local Kyma Lite installation on Minikube requires 4 CPU and 8GB of RAM. If you want to add more components to your installation, install Kyma on a cluster. <br>
<i>https://kyma-project.io/docs/#installation-installation</i>

In order to run Kyma locally inside of an Kubernetes cluster you have to make sure that all needed components have the correct version installed. 

If we follow the Installation Guide, the following versions are noted for Kyma V1.15.1 (latest):

- Minikube 1.13.0
- Kubernetes-CLI 1.19.2
- Hyperkit/Hyper-V
- Docker Desktop

In addition we need to install docker and the Kyma CLI.
For docker there is no version specified, for the Kyma CLI we want to make sure that, if you’re using Homebrew(MacOS) or Chocolatey(Windows), it's installing the correct version 1.15.1.

- On Mac you want to install the Hyperkit driver.

- On Windows you want to install the Hyper-V driver.

### MacOS

1. Install Minikube v1.13.0 and its dependencies

With the current and latest version of Kyma we can simply use Homebrew to install the latest version of Minikube (1.13.0) and its dependencies kubernetes-cli (1.19.2). Homebrew will resolve the dependencies and install all of them automatically.

I am using [iTerm2](http://iterm2.com/) as my command line interface but you can also use the standard Terminal application already installed on your Mac machine.

In your shell enter the following command to install Minikube:

```
brew install minikube
```

2. Verify the Minikube and Kubernetes-CLI version

Now that Homebrew has downloaded and installed Minikube and its dependencies we want to make sure the versions are correct before proceeding.

Open your shell and enter the following command to check the Minikube version:

```
minikube version
```

The outpul should show you the version number **1.13.0**.

We can do the same thing for the kubernetes-cli. Enter the following command in your shell:

```
kubectl version
```

The output is a bit more extensive here but we're just interested in the first line which should show you a version of **1.19.2**.

If we have both versions verified we can continue to the next step.

3. Install the Kyma-CLI

Again, we can utilize Homebrew to install the Kyma-CLI which we're going to use to provision Minikube and install Kyma on the provisioned Minikube cluster.

In your shell enter the following command and execute it:

```
brew install kyma-cli
```

After Homebrew downloaded and installed the CLI make sure the versioning is correct:

```
kyma version
```

The output should show you a version of **1.15.1** or newer.

4. Provision Minikube

With the correct versions installed we can now provision Minikube with the correct configuration to run a local Kyma installment.

What happens now is that we startup a Minikube instance and instead of using the default configuration, we tell Minikube to use the Kyma configuration instead.

```
kyma provision minikube —vm-driver=hyperkit
```

> The VM-Driver can be also set in the Minikube configuration file.

5. Install Kyma on the Minikube Cluster

The kubernetes cluster is up and running, the Kyma environment can now be deployed and installed.

```
kyma install
```

This will now take a while because Kyma needs to fetch and install all needed dependencies to run on the cluster. The components it is installing are for example istio, all sorts of knative packages and more. You can see a detailed list while Kyma is installing.

6. Verify your Kyma installment

To verify our installment we can fetch all pods of our current cluster and see in the output if Kyma is actually running inside of a Pod on our cluster.

```
kubectl get pods —all-namespaces
```

7. Open the Kyma console

The Kyma console is a Web UI used for Kyma administrators to manage the Kyma environment on an visual interface. You could also do everything on console as well.

![Kyma Console](https://github.wdf.sap.corp/d061070/kyma-runtime-virtual-event/blob/master/exercises/01/kyma-console-1.png)

### Windows

1. Install <b>Kubernetes-CLI 1.16.3</b>

```
choco install kubernetes-cli --version 1.16.3
```

```
kubectl version
```

2. Install Minikube 1.6.2

Before installing Minikube you need to check if you Windows 8 or newer supports virtualization. To do so execute:

```
systeminfo
```
The output should be something like this:

```
Hyper-V Requirements:     VM Monitor Mode Extensions: Yes
                          Virtualization Enabled In Firmware: Yes
                          Second Level Address Translation: Yes
                          Data Execution Prevention Available: Yes
```
If you see this:

```
Hyper-V Requirements:     A hypervisor has been detected. Features required for Hyper-V will not be displayed.
```
Your machine already has a Hypervisor installed.
Detailed instructions for Hypervisor on Windows please follow:
https://techcommunity.microsoft.com/t5/itops-talk-blog/step-by-step-enabling-hyper-v-for-use-on-windows-10/ba-p/267945

To install Minikube execute:

```
choco install minikube --version 1.6.2
```
```
minikube version
```

3. Install kyma-cli

```
choco install kyma-cli
```

```
kyma version
```

4. Provision Minikube

With the correct versions installed we can now provision Minikube with the correct configuration to run a local Kyma installment.

What happens now is that we startup a Minikube instance and instead of using the default configuration, we tell Minikube to use the Kyma configuration instead.

```
kyma provision minikube —vm-driver=hyper-v
```

> The VM-Driver can be also set in the Minikube configuration file.

5. Install Kyma on the Minikube Cluster

The kubernetes cluster is up and running, the Kyma environment can now be deployed and installed.

```
kyma install
```

This will now take a while because Kyma needs to fetch and install all needed dependencies to run on the cluster. The components it is installing are for example istio, all sorts of knative packages and more. You can see a detailed list while Kyma is installing.

6. Verify your Kyma installment

To verify our installment we can fetch all pods of our current cluster and see in the output if Kyma is actually running inside of a Pod on our cluster.

```
kubectl get pods —all-namespaces
```

7. Open the Kyma console

The Kyma console is a Web UI used for Kyma administrators to manage the Kyma environment on an visual interface. You could also do everything on console as well.

### Edit your Host File

In order for Kyma to be able to receive and establish network connection you should add the IP to your Hosts file. A Hosts file exist for both macOS as well as Windows. Please follow the following guides to achieve the secure change of the Hosts file. How to do this you can find under the **Tips** section:

- [Kyma-Hands-On - Part 1 by Anna Jung](https://blogs.sap.com/2020/06/22/kyma-hands-on-part-1/)