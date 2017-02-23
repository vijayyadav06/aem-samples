var dependencies = ["/apps/medtronic-com/components/common/DataLayer.js",
    "/apps/medtronic-com/components/common/JavaHelper.js"];

use(dependencies, function(dataLayer, JavaHelper) {
  if (dataLayer && dataLayer.product) {
    dataLayer.product.push({
      id: JavaHelper.toJSString(this.productDetail.getNumber() || ""),
      name: JavaHelper.toJSString(this.productDetail.getProductName() || "")
    });
  }
});