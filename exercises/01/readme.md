# Exercise 1 - Setup a local Kyma installment

## Steps

In this exercise we're going to show you, how you setup a local **project: "Kyma"** installment, for both Windows and MacOS.

The official reference documentation can be found on [kyma-project.io](https://kyma-project.io/docs/#installation-installation) and a more detailed installation Guide on the [Kyma-CLI GitHub Repository](https://github.com/kyma-project/cli/blob/master/docs/04-01-installation.md).

Before you get started installing all the necessary components, please make sure you fullfill the hardware requirements for a local Kyma installation.

The hardware requirements are:

> By default, the local Kyma Lite installation on Minikube requires 4 CPU and 8GB of RAM. If you want to add more components to your installation, install Kyma on a cluster. <br>
<i>https://kyma-project.io/docs/#installation-installation</i>

In order to run Kyma locally inside of an Kubernetes cluster you have to make sure that all needed components have the correct version installed. 

If we follow the Installation Guide, the following versions are noted for Kyma V1.14 (latest):

- Minikube 1.6.2
- Kubernetes-CLI 1.16.3
- Hyperkit/Hyper-V
- Docker

In addition we need to install docker and the Kyma CLI.
For docker there is no version specified, for the Kyma CLI we want to make sure that, if you’re using Homebrew(MacOS) or Chocolatey(Windows), it's installing the correct version 1.14.

- On Mac you want to install the Hyperkit driver.

- On Windows you want to install the Hyper-V driver.

### MacOS

1. Install <b>Kubernetes-CLI 1.16.3</b>

```
brew install https://raw.githubusercontent.com/Homebrew/homebrew-core/62afc1f862a762a037bf30150c31479630469517/Formula/kubernetes-cli.rb -f
```

```
kubectl version
```

2. Install Minikube 1.6.2

```
brew install https://raw.githubusercontent.com/Homebrew/homebrew-core/21a0efbd754779d29a078df5e74e0d90f06ed993/Formula/minikube.rb -f
```

```
minikube version
```

3. Install kyma-cli

```
brew install kyma-cli
```

```
kyma version
```

4. Install Hyperkit

```
brew install hyperkit
```

5. Provision Minikube

With the correct versions installed we can now provision Minikube with the correct configuration to run a local Kyma installment.

What happens now is that we startup a Minikube instance and instead of using the default configuration, we tell Minikube to use the Kyma configuration instead.

```
kyma provision minikube —vm-driver=hyperkit
```

> The VM-Driver can be also set in the Minikube configuration file.

6. Install Kyma on the Minikube Cluster

The kubernetes cluster is up and running, the Kyma environment can now be deployed and installed.

```
kyma install
```

This will now take a while because Kyma needs to fetch and install all needed dependencies to run on the cluster. The components it is installing are for example istio, all sorts of knative packages and more. You can see a detailed list while Kyma is installing.

7. Verify your Kyma installment

To verify our installment we can fetch all pods of our current cluster and see in the output if Kyma is actually running inside of a Pod on our cluster.

```
kubectl get pods —all-namespaces
```

8. Open the Kyma console

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
