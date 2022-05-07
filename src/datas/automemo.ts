export const yodobashi = {
  url: 'https://www.yodobashi.com/?word=Automemo',
  pricePath: 'li .productPrice',
  namePath: 'a .pName',
};
export const bic = {
  url: 'https://www.biccamera.com/bc/category/?q=meeting+owl&sg=Automemo',
  pricePath: 'li .bcs_price',
  namePath: 'p .bcs_item',
};
export const yamada = {
  url: 'https://www.yamada-denkiweb.com/search/Automemo/?path=&searchbox=1',
  pricePath: 'p .large',
  namePath: 'div .item-name',
};
export const nojima = {
  url: 'https://online.nojima.co.jp/app/catalog/list/init?searchCategoryCode=0&searchMethod=0&searchWord=automemo',
  pricePath: 'div .price',
  namePath: 'div .textOverflowShohinmei',
};
export const edion = {
  url: 'https://www.edion.com/item_list.html?keyword=Automemo',
  pricePath: 'li .price2',
  namePath: 'li .item',
};
export const kakakucom = {
  url: 'https://kakaku.com/item/K0001314464/?lid=pc_ksearch_kakakuitem',
  pricePath: 'div .p-PTPrice_price',
  namePath: 'p .p-PTShopData_name_link',
  linkPath: '.p-PTShop_btn a',
};
export const rakuten = {
  url: 'https://product.rakuten.co.jp/product/-/4a160d6102655e4c65d5012f430753fc/item/?l2-id=pdt_item_more#price_compare',
  pricePath: 'td .itemPrice3',
  namePath: 'td .shop_link',
};
export const paypay = {
  url: 'https://paypaymall.yahoo.co.jp/search?p=AM1WH&cid=&brandid=&kspec=&b=1',
  pricePath: 'p .ListItem_price',
  namePath: 'div .ListItem_seller',
};
