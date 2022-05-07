// NOTE:MIXINに近い？
const formatDistanceToNow = require('date-fns/formatDistanceToNow');
const ja = require('date-fns/locale/ja');

export const testFunction = (data: string) => {
  return 'hello ' + data;
};

export const formatDateTime = (timestamp: any) => {
  if (!timestamp) return new Date();
  const result = formatDistanceToNow(timestamp?.toDate(), {
    addSuffix: true,
    locale: ja,
  });
  return result;
};
