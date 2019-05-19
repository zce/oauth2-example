请求授权

GET /authorize
  client_id: 9c16d1d9d4235bb723c4
  redirect_uri: https%3A%2F%2Flearn.co%2Fusers%2Fauth%2Fgithub%2Fcallback
  response_type: code
  state: 7947e14af4fd2607a8d47072a91fc5ffeea414aad803eb9f

认证服务器如果没有登陆调整到认证服务器的登陆页

GET /login
  client_id: 9c16d1d9d4235bb723c4
  return_to: %2Flogin%2Foauth%2Fauthorize%3Fclient_id%3D9c16d1d9d4235bb723c4%26redirect_uri%3Dhttps%253A%252F%252Flearn.co%252Fusers%252Fauth%252Fgithub%252Fcallback%26response_type%3Dcode%26state%3D7947e14af4fd2607a8d47072a91fc5ffeea414aad803eb9f

用户在认证服务器登陆

POST /session
  commit: Sign in
  utf8: ✓
  authenticity_token: GoX03z/XHDderiumSP3pMKkK4cP38i5V+hMrRkMDuD0d1jRNB4n81NRedgStfV/s32RsJ54o0Gh39+xkPNx2QA==
  login: zce
  password: 2016@github
  webauthn-support: supported

跳转到授权页面

GET /authorize
  client_id: 9c16d1d9d4235bb723c4
  redirect_uri: https://learn.co/users/auth/github/callback
  response_type: code
  state: 7947e14af4fd2607a8d47072a91fc5ffeea414aad803eb9f

点击授权

POST /authorize
  authorize: 1
  utf8: ✓
  authenticity_token: GedCj5re39pooef5C8P2gLkAsie4wv4DBkouCqbFw7purEdo9+1EgGtI3k0ZSrUx01vd2ozVQe+Ho1nauoGqPA==
  client_id: 9c16d1d9d4235bb723c4
  redirect_uri: https://learn.co/users/auth/github/callback
  state: 7947e14af4fd2607a8d47072a91fc5ffeea414aad803eb9f
  scope:
  authorize: 1

调整到回调页面

GET /callback
  code: 7c91849181a5cc05d777
  state: 7947e14af4fd2607a8d47072a91fc5ffeea414aad803eb9f