import { Runtime } from "aws-cdk-lib/aws-lambda";
import {
  NodejsFunction,
  NodejsFunctionProps,
} from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

interface ServiceProps {
  bucket?: any;
}

export class ServiceStack extends Construct {
  public readonly productService: NodejsFunction;
  public readonly categoryService: NodejsFunction;
  public readonly dealsService: NodejsFunction;
  constructor(scope: Construct, id: string, props: ServiceProps) {
    super(scope, id);

    const nodejsFunctionProps: NodejsFunctionProps = {
      bundling: {
        externalModules: ["aws-sdk"],
      },
      environment: {
        BUCKET_NAME: "OUR_BUCKET_ARN",
      },
      runtime: Runtime.NODEJS_18_X,
    };

    this.productService = new NodejsFunction(this, "productLambda", {
      entry: join(__dirname, "/../src/apis/product-api.ts"),
      ...nodejsFunctionProps,
    });
    this.categoryService = new NodejsFunction(this, "categoryLambda", {
      entry: join(__dirname, "/../src/apis/category-api.ts"),
      ...nodejsFunctionProps,
    });
    this.dealsService = new NodejsFunction(this, "dealsLambda", {
      entry: join(__dirname, "/../src/apis/deals-api.ts"),
      ...nodejsFunctionProps,
    });
  }
}
