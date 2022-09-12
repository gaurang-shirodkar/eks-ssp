import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import * as blueprints from '@aws-quickstart/eks-blueprints';
// import { KubernetesVersion } from 'aws-cdk-lib/aws-eks';
import * as eks from 'aws-cdk-lib/aws-eks';
import * as ec2 from 'aws-cdk-lib/aws-ec2';



const app = new cdk.App();
const account = '712329029476';
const region = 'us-east-1';

const addOns: Array<blueprints.ClusterAddOn> = [
    // new blueprints.addons.ArgoCDAddOn,
    // new blueprints.addons.CalicoAddOn,
    // new blueprints.addons.MetricsServerAddOn,
    // new blueprints.addons.ClusterAutoScalerAddOn,
    // new blueprints.addons.ContainerInsightsAddOn,
    // new blueprints.addons.AwsLoadBalancerControllerAddOn(),
    new blueprints.addons.VpcCniAddOn(),
    new blueprints.addons.CoreDnsAddOn(),
    new blueprints.addons.KubeProxyAddOn(),
    // new blueprints.addons.XrayAddOn()
];


const clusterProvider = new blueprints.GenericClusterProvider({
  version: eks.KubernetesVersion.V1_21,
  managedNodeGroups: [
      {
          id: "mng-ondemand",
          amiType: eks.NodegroupAmiType.AL2_X86_64,
          instanceTypes: [new ec2.InstanceType('m5.2xlarge')],
          minSize: 1,
          maxSize: 2,
          desiredSize: 2
      }],
    })
blueprints.EksBlueprint.builder()
    .account(account)
    .region(region)
    .addOns(...addOns)
    .clusterProvider(clusterProvider)
    .build(app, 'eks-blueprint')