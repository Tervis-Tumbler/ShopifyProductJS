export async function Get_ShopifyProductMetafield(
    {
        $ShopifyDomain,
        $ShopifyAccessToken,
        $ShopifyProductId,
        $MetafieldNamespace,
        $MetafieldKey
    }
) {
    const $Query = `{
        product(
          id:"gid://shopify/Product/${$ShopifyProductId}"
        ) {
          metafield(
            namespace: "${$MetafieldNamespace}"
            key: "${$MetafieldKey}"
          ) {
            key
            value
          }
        }
      }`
    const $Url = `https://${$ShopifyDomain}.myshopify.com/admin/api/2020-04/graphql.json`
    const $Options = {
        method: 'POST',
        headers: {
            'content-type': 'application/graphql',
            'X-Shopify-Access-Token': `${$ShopifyAccessToken}`,
        },
        body: $Query
    }

    try {
        const $Product = await fetch($Url, $Options).then($Response => $Response.json())
        return $Product.data.product.metafield
    } catch (e) {
        return {
            error: e
        }
    }
}