# NOVA Store



```bash
npm install
cp .env.example .env
npm run dev
```


بیلد:

```bash
npm run build
npm start
```

نرخ دلار:

قیمت محصولات به دلار است. سرور نرخ بازار آزاد تهران را آنلاین از [نرخ‌آرا](https://nerkhara.com/api/v1/latest/usd.json) می‌گیرد و قیمت را به تومان نشان می‌دهد. نتیجه ۱۰ دقیقه کش می‌شود. اگر این درخواست خطا بدهد یا نرخ کهنه باشد، از `NEXT_PUBLIC_USD_TO_TOMAN` در `.env` استفاده می‌شود.
