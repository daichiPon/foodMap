// src/aws-exports.js
const awsconfig = {
  Auth: {
    Cognito:{
    region: 'ap-northeast-1',
    userPoolId: 'ap-northeast-1_BDRbBlXN6',
    userPoolClientId: '74t3aqik7ig8jba9si9poei988',
    loginWith:{
        email: true, 
      },
  },
  },
};

export default awsconfig;
