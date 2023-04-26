import { aws_apigateway } from "aws-cdk-lib";
import { RestApi } from "aws-cdk-lib/aws-apigateway";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

interface ApiGatewayProps {
  productService: IFunction;
  categoryService: IFunction;
  dealsService: IFunction;
}

interface ResourceType {
  name: string;
  method: string[];
  child?: ResourceType;
}

export class ApiGatewayStack extends Construct {
  constructor(scope: Construct, id: string, props: ApiGatewayProps) {
    super(scope, id);
    this.addResources("product", props);
  }

  addResources(
    serviceName: string,
    { productService, categoryService, dealsService }: ApiGatewayProps
  ) {
    const apgw = new aws_apigateway.RestApi(this, `${serviceName}-ApiGtw`);
    
    // product
    this.createEndpoints(productService, apgw, {
      name: "product",
      method: ["GET", "POST"],
      child: {
        name: "{id}",
        method: ["GET", "DELETE", "PUT"],
      },
    });
    // category
    this.createEndpoints(categoryService, apgw, {
      name: "category",
      method: ["GET", "POST"],
      child: {
        name: "{id}",
        method: ["GET", "DELETE", "PUT"],
      },
    });
    // deals
    this.createEndpoints(dealsService, apgw, {
      name: "deals",
      method: ["GET", "POST"],
      child: {
        name: "{id}",
        method: ["GET", "DELETE", "PUT"],
      },
    });
  }
  createEndpoints(
    handler: IFunction,
    resource: RestApi,
    { name, method, child }: ResourceType
  ) {
    const serviceIntegration = new aws_apigateway.LambdaIntegration(handler);
    const rootResource = resource.root.addResource(name);
    method.map((item) => {
      rootResource.addMethod(item, serviceIntegration);
    });

    if (child) {
      const childResource = rootResource.addResource(child.name);
      child.method.map((item) => {
        childResource.addMethod(item, serviceIntegration);
      });
    }
  }
}
