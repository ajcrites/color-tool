# CSS Color Tool
A color tool for converting and manipulating CSS color values.

This was created both for its own utility and as an example of how to create a
React app using hooks.

## For Developers
Clone and run `yarn parcel serve src/index.html` to have the app served locally
on http://localhost:1234.

## Deployment

Create a Netlify account -- you will need a netlify token. Optionally you can
point this to your own domain via the `site_name` variable or omit it. Then you
can deploy the app to Netlify with Terraform:

    terraform plan -var netlify_token=$TOKEN -var app_name=$APP_NAME -out color-tool.tfplan
    terraform apply color-tool.tfplan
