const yodobashi = {
  url: "https://www.yodobashi.com/?word=meetingOwl",
  pricePath: "li .productPrice",
  namePath: "a .pName",
};
const bic = {
  url: "https://www.biccamera.com/bc/category/?q=meeting+owl&sg=Meetingowl",
  pricePath: "li .bcs_price",
  namePath: "p .bcs_item",
};
const yamada = {
  url: "https://www.yamada-denkiweb.com/search/meetingowl/?path=&searchbox=1",
  pricePath: "p .large",
  namePath: "div .item-name",
};
const nojima = {
  url:
    "https://online.nojima.co.jp/app/catalog/list/init?searchCategoryCode=0&searchMethod=0&searchWord=Meetingowl",
  pricePath: "div .price",
  namePath: "div .textOverflowShohinmei",
};
const edion = {
  url: "https://www.edion.com/item_list.html?keyword=meetingowl",
  pricePath: "li .price2",
  namePath: "li .item",
};
const kakakucom = {
  url: "https://kakaku.com/item/K0001262742/?lid=pc_ksearch_kakakuitem",
  pricePath: "div .p-PTPrice_price",
  namePath: "p .p-PTShopData_name_link",
  linkPath: ".p-PTShop_btn a",
};
const rakuten = {
  url:
    "https://product.rakuten.co.jp/product/-/9d9040af1dba7d037cd8b172659c7442/item/?l2-id=pdt_item_more#price_compare",
  pricePath: "td .itemPrice3",
  namePath: "td .shop_link",
};
const paypay = {
  url:
    "https://paypaymall.yahoo.co.jp/search?p=meeting%20owl%20pro&cid=&brandid=&kspec=&b=1",
  pricePath: "p .ListItem_price",
  namePath: "div .ListItem_seller",
};

module.exports = {
  yodobashi,
  bic,
  yamada,
  nojima,
  edion,
  kakakucom,
  rakuten,
  paypay,
};
