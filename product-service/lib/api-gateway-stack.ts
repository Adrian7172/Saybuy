import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

interface ApiGatewayProps {
  productService: IFunction;
}

export class ApiGatewayStack extends Construct {
  constructor(
    scope: Construct,
    id: string,
    { productService }: ApiGatewayProps
  ) {
    super(scope, id);
    this.addResources("product", productService);
  }
  addResources(serviceName: string, handler: IFunction) {
    const apgw = new LambdaRestApi(this, `${serviceName}-ApiGtw`, {
      restApiName: `${serviceName}-service`,
      handler,
      proxy: false,
    });

    // for /product
    const productResources = apgw.root.addResource("product");
    productResources.addMethod("GET");
    productResources.addMethod("POST");

    // for /product/:id
    const productIdResources = productResources.addResource("{id}");
    productIdResources.addMethod("GET");
    productIdResources.addMethod("PUT");
    productIdResources.addMethod("DELETE");

    //for /category
    const categoryResources = apgw.root.addResource("category");
    categoryResources.addMethod("POST");
    categoryResources.addMethod("GET");

    // for /category/:id
    const categoryIdResources = categoryResources.addResource("{id}");
    categoryIdResources.addMethod("GET");
    categoryIdResources.addMethod("PUT");
    categoryIdResources.addMethod("DELETE");

    //for /deals
    const dealsResources = apgw.root.addResource("deals");
    dealsResources.addMethod("POST");
    dealsResources.addMethod("GET");

    // for /deals/:id
    const dealsIdResources = dealsResources.addResource("{id}");
    dealsIdResources.addMethod("GET");
    dealsIdResources.addMethod("PUT");
    dealsIdResources.addMethod("DELETE");
  }
}
