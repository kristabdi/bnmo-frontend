
## Tech Stack
```
React Typescript 18.2.0
Tailwind
```

## How-to-Run
You can run the web by `yarn start` in CLI.\
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will connected with backend if the backend already started.\

## How-to-Use

```
1. Create an account in register page.
2. Login as an admin by typing username admin and password admin in login page.
3. Verify the specified user.
4. Logout from admin and login as the user that has been registered.
5. As an user, user can make a request (withdraw or deposit) and transaction to another user with any currency.

PS.\ 
A request must be verified first by admin in the requests verification apge before processed.
Transaction to invalid customer username will not be processed.
```

## Design Pattern
```
1. Builder
Component Table cukup digunakan sebagai builder dimana fleksibilitas data dan header terlihat ketika komponen tabel digunakan pada page user
verif, request verif, dan history untuk request ataupun transaction. Variasi pun dapat dilakukan dengan banyak meskipun technically table tidak membuat objek baru seperti builder, tetapi komponen yang dibuat dapat bervariasi.
2. Composite
Memiliki design pattern komposit, misalnya NavbarUser, NavbarAdmin, atau LogoutButton yang digunakan pada komponen atau page lainnya.
```

## Bonus
1. Verify the destination account in the transfer feature so that if the destination account is invalid, the balance transfer process cannot be carried out.
2. User-friendly interface (consistent and good design)

