import json


jsonData = '{"code":"success","data":{"dataList":[{"modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":1,"operator":"","c_DATA_CODE":"ASS_BXGSWTZH",' \
           '"c_DATA_NAME":"保险公司委托账户","c_DATA_CODE_P":"[root]","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":1,"operator":"","c_DATA_CODE":"ASS_BXSTZC",' \
           '"c_DATA_NAME":"保险受托资产","c_DATA_CODE_P":"[root]","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":1,"operator":"","c_DATA_CODE":"ASS_BXZCCP",' \
           '"c_DATA_NAME":"保险资产产品","c_DATA_CODE_P":"[root]","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":1,"operator":"","c_DATA_CODE":"ASS_FOF",' \
           '"c_DATA_NAME":"FOF基金","c_DATA_CODE_P":"[root]","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":1,"operator":"","c_DATA_CODE":"ASS_GKMJZQTZJJ",' \
           '"c_DATA_NAME":"公开募集证券投资基金","c_DATA_CODE_P":"[root]","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":1,"operator":"","c_DATA_CODE":"ASS_JBYLBXJJ",' \
           '"c_DATA_NAME":"基本养老保险基金","c_DATA_CODE_P":"[root]","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":1,"operator":"","c_DATA_CODE":"ASS_JJZH",' \
           '"c_DATA_NAME":"基金专户","c_DATA_CODE_P":"[root]","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":1,"operator":"","c_DATA_CODE":"ASS_QDII",' \
           '"c_DATA_NAME":"QDII证券基金","c_DATA_CODE_P":"[root]","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3013","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"0001","c_DATA_NAME":"0001","c_DATA_CODE_P":"ASS_QDII","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":["YWQNG","jk","jkgl"],"auditedPostList":[],"oldPostList":[' \
           '"YWQNG","jk","jkgl"]},{"id":"3920","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"0009",' \
           '"c_DATA_NAME":"0009","c_DATA_CODE_P":"ASS_QDII","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":["YWQNG","jk","jkgl"],"auditedPostList":[],"oldPostList":["YWQNG","jk","jkgl"]},{"id":"3037",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"111TTAA","c_DATA_NAME":"111TTAA","c_DATA_CODE_P":"ASS_QDII",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3044","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":1,"operator":"","c_DATA_CODE":"111tt123","c_DATA_NAME":"111tt123",' \
           '"c_DATA_CODE_P":"ASS_QDII","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":["YWQNG","jk",' \
           '"jkgl"],"auditedPostList":["YWQNG","jk","jkgl"],"oldPostList":["YWQNG","jk","jkgl"]},{"id":"3045",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"11222333","c_DATA_NAME":"11222333","c_DATA_CODE_P":"ASS_QDII",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3038","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"1122ttt","c_DATA_NAME":"1122ttt","c_DATA_CODE_P":"ASS_QDII",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3360","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"1212222","c_DATA_NAME":"1212222","c_DATA_CODE_P":"1122ttt",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3054","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"1133333","c_DATA_NAME":"1133333","c_DATA_CODE_P":"ASS_QDII",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3048","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"11ab","c_DATA_NAME":"11ab","c_DATA_CODE_P":"ASS_QDII",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":["YWQNG","jk","jkgl"],"auditedPostList":[' \
           '],"oldPostList":["YWQNG","jk","jkgl"]},{"id":"3049","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"11abc",' \
           '"c_DATA_NAME":"11abc","c_DATA_CODE_P":"ASS_QDII","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3047","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"11abcd","c_DATA_NAME":"11abcd","c_DATA_CODE_P":"ASS_QDII","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3023",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"11abt","c_DATA_NAME":"11abt","c_DATA_CODE_P":"ASS_QDII","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3043",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"11attt","c_DATA_NAME":"11attt","c_DATA_CODE_P":"ASS_QDII","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3040",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"1222TTT","c_DATA_NAME":"1222TTT","c_DATA_CODE_P":"ASS_QDII",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3061","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"123ab","c_DATA_NAME":"123ab","c_DATA_CODE_P":"ASS_QDII",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3056","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"123abc","c_DATA_NAME":"123abc","c_DATA_CODE_P":"ASS_QDII",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3058","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"12ab","c_DATA_NAME":"12ab","c_DATA_CODE_P":"ASS_QDII",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3010","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":1,"operator":"","c_DATA_CODE":"160929","c_DATA_NAME":"160929","c_DATA_CODE_P":"ASS_QDII",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":["YWQNG","jk","jkgl"],"auditedPostList":[' \
           '"YWQNG","jk","jkgl"],"oldPostList":["YWQNG","jk","jkgl"]},{"id":"3036","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"1t2222","c_DATA_NAME":"1t2222","c_DATA_CODE_P":"ASS_QDII","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9627",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"202801","c_DATA_NAME":"南方全球精选配置证券投资基金","c_DATA_CODE_P":"ASS_QDII",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3053","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":1,"operator":"","c_DATA_CODE":"22aa","c_DATA_NAME":"22aa","c_DATA_CODE_P":"ASS_QDII",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":["jk","jkgl"],"auditedPostList":["jk",' \
           '"jkgl"],"oldPostList":["jk","jkgl"]},{"id":"3042","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"33ab",' \
           '"c_DATA_NAME":"33ab","c_DATA_CODE_P":"ASS_QDII","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3050","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"33abc","c_DATA_NAME":"33abc","c_DATA_CODE_P":"ASS_QDII","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3051",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"33abcd","c_DATA_NAME":"33abcd","c_DATA_CODE_P":"ASS_QDII","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3035",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"33tt1111","c_DATA_NAME":"33tt1111","c_DATA_CODE_P":"ASS_QDII",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3024","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"3rt4234","c_DATA_NAME":"3rt4234","c_DATA_CODE_P":"ASS_QDII",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3301","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"4524365","c_DATA_NAME":"4524365","c_DATA_CODE_P":"ASS_QDII",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3022","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"55ttt","c_DATA_NAME":"55ttt","c_DATA_CODE_P":"ASS_QDII",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3060","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"65658888","c_DATA_NAME":"65658888",' \
           '"c_DATA_CODE_P":"ASS_QDII","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"3059","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"65659999",' \
           '"c_DATA_NAME":"65659999","c_DATA_CODE_P":"ASS_QDII","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3020","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"A005","c_DATA_NAME":"A005","c_DATA_CODE_P":"ASS_QDII","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3017",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"A0104","c_DATA_NAME":"A0104","c_DATA_CODE_P":"ASS_QDII","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3018",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"A0105","c_DATA_NAME":"A0105","c_DATA_CODE_P":"ASS_QDII","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3055",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"A11111","c_DATA_NAME":"A11111","c_DATA_CODE_P":"ASS_QDII","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3021",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"A44ttt","c_DATA_NAME":"A44ttt","c_DATA_CODE_P":"ASS_QDII","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3046",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"AB2222","c_DATA_NAME":"AB2222","c_DATA_CODE_P":"ASS_QDII","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3039",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"ABBBB","c_DATA_NAME":"ABBBB","c_DATA_CODE_P":"ASS_QDII","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9529",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"GFund","c_DATA_NAME":"南方全球精选配置证券投资基金","c_DATA_CODE_P":"ASS_QDII",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3011","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"QD001691","c_DATA_NAME":"南方香港成长灵活配置混合型证券投资基金",' \
           '"c_DATA_CODE_P":"ASS_QDII","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"3012","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"QD002400",' \
           '"c_DATA_NAME":"南方亚洲美元收益债券型证券投资基金","c_DATA_CODE_P":"ASS_QDII","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8",' \
           '"n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3006","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"QD160125","c_DATA_NAME":"南方香港优选股票型证券投资基金","c_DATA_CODE_P":"ASS_QDII","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"10000",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"S66385","c_DATA_NAME":"S66385","c_DATA_CODE_P":"ASS_QDII","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3019",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"T98765","c_DATA_NAME":"T98765","c_DATA_CODE_P":"ASS_QDII","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3032",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"aaa","c_DATA_NAME":"aaa","c_DATA_CODE_P":"ASS_QDII","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3027",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"asdasdc","c_DATA_NAME":"asasasdcads","c_DATA_CODE_P":"ASS_QDII",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3030","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"attt","c_DATA_NAME":"attt","c_DATA_CODE_P":"ASS_QDII",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3401","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"bbbb","c_DATA_NAME":"bbbb","c_DATA_CODE_P":"ASS_QDII",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3015","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"ee","c_DATA_NAME":"ee","c_DATA_CODE_P":"ASS_QDII",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3014","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"ph","c_DATA_NAME":"ph","c_DATA_CODE_P":"ASS_QDII",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3016","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"pphh","c_DATA_NAME":"pphh","c_DATA_CODE_P":"ASS_QDII",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3028","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"qqq","c_DATA_NAME":"qqq","c_DATA_CODE_P":"ASS_QDII",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3025","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"qqqqq","c_DATA_NAME":"qqqqqqqqq","c_DATA_CODE_P":"ASS_QDII",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3033","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"s1","c_DATA_NAME":"s1","c_DATA_CODE_P":"ASS_QDII",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3031","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"ss","c_DATA_NAME":"ss","c_DATA_CODE_P":"ASS_QDII",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3057","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"tb22abcd","c_DATA_NAME":"测试2A/B","c_DATA_CODE_P":"ASS_QDII",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3041","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"weee","c_DATA_NAME":"weee","c_DATA_CODE_P":"ASS_QDII",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3029","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"y111","c_DATA_NAME":"y111","c_DATA_CODE_P":"ASS_QDII",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":1,' \
           '"operator":"","c_DATA_CODE":"ASS_QDIIZH","c_DATA_NAME":"QDII专户理财","c_DATA_CODE_P":"[root]",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3475","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"028138","c_DATA_NAME":"国泰-全球投资6号资产管理计划",' \
           '"c_DATA_CODE_P":"ASS_QDIIZH","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"3482","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"029049",' \
           '"c_DATA_NAME":"国泰-恒泰证券新股1号资产管理计划","c_DATA_CODE_P":"ASS_QDIIZH","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8",' \
           '"n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3472","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"029055","c_DATA_NAME":"国泰-全球投资1号资产管理计划","c_DATA_CODE_P":"ASS_QDIIZH","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3478",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"029059","c_DATA_NAME":"国泰基金-河北银行资产管理计划","c_DATA_CODE_P":"ASS_QDIIZH",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":1,' \
           '"operator":"","c_DATA_CODE":"ASS_QHZG","c_DATA_NAME":"期货资管","c_DATA_CODE_P":"[root]","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":1,"operator":"",' \
           '"c_DATA_CODE":"ASS_QSLC","c_DATA_NAME":"券商理财","c_DATA_CODE_P":"[root]","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":1,"operator":"",' \
           '"c_DATA_CODE":"ASS_QYNJJJ","c_DATA_NAME":"企业年金基金","c_DATA_CODE_P":"[root]","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3381",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"2019zsm","c_DATA_NAME":"2019zsm","c_DATA_CODE_P":"ASS_QYNJJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":1,' \
           '"operator":"","c_DATA_CODE":"ASS_RQDIIZH","c_DATA_NAME":"RQDII专户","c_DATA_CODE_P":"[root]",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":1,' \
           '"operator":"","c_DATA_CODE":"ASS_RQFII","c_DATA_NAME":"RQFII证券基金","c_DATA_CODE_P":"[root]",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3062","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"CHDBDF","c_DATA_NAME":"中港策略","c_DATA_CODE_P":"ASS_RQFII",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3063","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"HKDBDF","c_DATA_NAME":"汇添富香港港币债券型基金",' \
           '"c_DATA_CODE_P":"ASS_RQFII","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":1,"operator":"","c_DATA_CODE":"ASS_SBJJ",' \
           '"c_DATA_NAME":"社会保障基金","c_DATA_CODE_P":"[root]","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":1,"operator":"","c_DATA_CODE":"ASS_SMTZJJ",' \
           '"c_DATA_NAME":"私募投资基金","c_DATA_CODE_P":"[root]","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":1,"operator":"","c_DATA_CODE":"ASS_XTZCCP",' \
           '"c_DATA_NAME":"信托计划产品","c_DATA_CODE_P":"[root]","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":1,"operator":"","c_DATA_CODE":"ASS_YHZCCP",' \
           '"c_DATA_NAME":"银行资产产品","c_DATA_CODE_P":"[root]","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":1,"operator":"","c_DATA_CODE":"ASS_YLBZCP",' \
           '"c_DATA_NAME":"养老保障产品","c_DATA_CODE_P":"[root]","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":1,"operator":"","c_DATA_CODE":"ASS_YLJZCJH",' \
           '"c_DATA_NAME":"企业年金养老金产品","c_DATA_CODE_P":"[root]","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":1,"operator":"","c_DATA_CODE":"ASS_ZCGLJH",' \
           '"c_DATA_NAME":"资产管理计划","c_DATA_CODE_P":"[root]","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9690","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"111","c_DATA_NAME":"111","c_DATA_CODE_P":"ASS_ZCGLJH","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3071",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"148148","c_DATA_NAME":"海通测试1","c_DATA_CODE_P":"ASS_ZCGLJH",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3080","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"168168","c_DATA_NAME":"回归测试","c_DATA_CODE_P":"ASS_ZCGLJH",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3081","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"22222","c_DATA_NAME":"22222","c_DATA_CODE_P":"ASS_ZCGLJH",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3077","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"851860","c_DATA_NAME":"海通赢家系列-半年鑫集合资产管理计划",' \
           '"c_DATA_CODE_P":"ASS_ZCGLJH","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"3076","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"851890",' \
           '"c_DATA_NAME":"年年鑫","c_DATA_CODE_P":"ASS_ZCGLJH","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3074","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"852099","c_DATA_NAME":"海通月月升集合资产管理计划","c_DATA_CODE_P":"ASS_ZCGLJH","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3078",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"855OTC","c_DATA_NAME":"海通月月财集合资产管理计划","c_DATA_CODE_P":"ASS_ZCGLJH",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3079","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"989898","c_DATA_NAME":"海通北极星改造方案",' \
           '"c_DATA_CODE_P":"ASS_ZCGLJH","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"3065","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"A00003",' \
           '"c_DATA_NAME":"海洋1号","c_DATA_CODE_P":"ASS_ZCGLJH","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3068","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"A0001","c_DATA_NAME":"文奇对冲套利1号","c_DATA_CODE_P":"ASS_ZCGLJH","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3072",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"B0514","c_DATA_NAME":"康曼德103号主动管理型私募证券投资基金","c_DATA_CODE_P":"ASS_ZCGLJH",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3066","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"S00001","c_DATA_NAME":"宝利2号","c_DATA_CODE_P":"ASS_ZCGLJH",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3075","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"S19388","c_DATA_NAME":"海通北极星1号集合资产管理计划",' \
           '"c_DATA_CODE_P":"ASS_ZCGLJH","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"3067","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"S25037",' \
           '"c_DATA_NAME":"宝时专户1号-樱花","c_DATA_CODE_P":"ASS_ZCGLJH","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8",' \
           '"n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3073","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"S73613","c_DATA_NAME":"宝石1号","c_DATA_CODE_P":"ASS_ZCGLJH","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3141",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"asf","c_DATA_NAME":"SADG","c_DATA_CODE_P":"ASS_ZCGLJH","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3004",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"ttttta","c_DATA_NAME":"ttttta","c_DATA_CODE_P":"ASS_ZCGLJH",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":1,' \
           '"operator":"","c_DATA_CODE":"ASS_ZCZCZXJH","c_DATA_NAME":"资产支持专项计划","c_DATA_CODE_P":"[root]",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":1,' \
           '"operator":"","c_DATA_CODE":"ASS_ZQTZJJ","c_DATA_NAME":"证券投资基金","c_DATA_CODE_P":"[root]",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3179","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"000007","c_DATA_NAME":"鹏华国企债债券","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"2845","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"000020","c_DATA_NAME":"测试测试000020",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"9404","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"000022",' \
           '"c_DATA_NAME":"南方中债中期票据指数债券型发起式证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9966",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"000023","c_DATA_NAME":"南方中票C","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9405","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"000086","c_DATA_NAME":"南方稳利1年定期开放债券型证券投资基金",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"9957","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"0002",' \
           '"c_DATA_NAME":"0002","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3320","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"000289","c_DATA_NAME":"鹏华xxxx","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9958",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"0003","c_DATA_NAME":"0003","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9406",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"000326","c_DATA_NAME":"南方顺达保本混合型证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9407","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"000327","c_DATA_NAME":"南方丰合保本混合型证券投资基金",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"9408","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"000355",' \
           '"c_DATA_NAME":"南方丰元A","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9409","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"000452","c_DATA_NAME":"南方医药保健灵活配置混合型证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9410","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"000493","c_DATA_NAME":"南方现金通货币市场基金",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"9411","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"000527",' \
           '"c_DATA_NAME":"南方新优享灵活配置混合型证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8",' \
           '"n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9412","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"000554","c_DATA_NAME":"中国梦灵活配置混合型证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9413",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"000561","c_DATA_NAME":"南方启元债券型证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9964","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"000562","c_DATA_NAME":"南方启元C","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9414","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"000563","c_DATA_NAME":"南方通利债券型证券投资基金",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"9415","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"000687",' \
           '"c_DATA_NAME":"南方薪金宝货币市场基金","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8",' \
           '"n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9416","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"000816","c_DATA_NAME":"南方理财金交易型货币市场基金","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9417",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"000844","c_DATA_NAME":"南方绝对收益策略定期开放混合型发起式基金","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9418","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"000955","c_DATA_NAME":"南方产业活力股票型证券投资基金1",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"9419","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"000997",' \
           '"c_DATA_NAME":"南方双元债券型证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8",' \
           '"n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9420","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"001053","c_DATA_NAME":"南方创新经济灵活配置混合型证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9421","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"001113","c_DATA_NAME":"南方大数据100指数证券投资基金",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"9422","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"001181",' \
           '"c_DATA_NAME":"南方改革机遇灵活配置混合型证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8",' \
           '"n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9423","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"001183","c_DATA_NAME":"南方利淘灵活配置混合型证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9424",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"001334","c_DATA_NAME":"南方利鑫灵活配置混合型证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9425","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"001335","c_DATA_NAME":"南方利众灵活配置混合型证券投资基金",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"9426","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"001420",' \
           '"c_DATA_NAME":"大数据300A","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8",' \
           '"n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9427","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"001421","c_DATA_NAME":"南方量化成长股票型证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9428",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"001566","c_DATA_NAME":"南方利达灵活配置混合型证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9429","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"001570","c_DATA_NAME":"南方利安灵活配置混合型证券投资基金",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"9430","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"001692",' \
           '"c_DATA_NAME":"南方国策动力股票型证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8",' \
           '"n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9431","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"001772","c_DATA_NAME":"南方消费活力灵活配置混合型发起式证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9432","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"002015","c_DATA_NAME":"南方荣光灵活配置混合型证券投资基金",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"9433","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"002167",' \
           '"c_DATA_NAME":"南方顺康保本混合型证券投资基金-中国银行","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9434",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"002218","c_DATA_NAME":"南方弘利定期开放债券型发起式证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"4001","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"020101GP11ZGLS01","c_DATA_NAME":"上交所股票_股票增股流水，正常清算",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"4002","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"030101ZQXXBCZQBG01",' \
           '"c_DATA_NAME":"只有证券代码不一样，股票买入后证券信息变更，库存方案,生成撤销","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"10104",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"060606","c_DATA_NAME":"cs","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9751",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"080116","c_DATA_NAME":"证券结算业务测试","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3099","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"100122","c_DATA_NAME":"100122","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9489","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"100500","c_DATA_NAME":"中证500交易型开放式指数证券投资基金",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"3101","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"111111",' \
           '"c_DATA_NAME":"111111","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3980","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"1111213213","c_DATA_NAME":"TEST并行组合","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"10147",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"11test11","c_DATA_NAME":"11test11","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"4000","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"1200XJTC0101","c_DATA_NAME":"现金头寸预测表新增头寸指标指标",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"4003","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"1200XJTC03XJTC01",' \
           '"c_DATA_NAME":"现金头寸预测表-ZGNEW","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8",' \
           '"n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9689","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"123","c_DATA_NAME":"123","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"10114",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"123123","c_DATA_NAME":"123123","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"10087","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"123456","c_DATA_NAME":"中信测试业绩报酬",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"4060","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"123456789",' \
           '"c_DATA_NAME":"123456789","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8",' \
           '"n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"10111","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"138138","c_DATA_NAME":"138138","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9854",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"146146","c_DATA_NAME":"分级测试","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"10112",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"148168","c_DATA_NAME":"148168","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"10119","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"148178","c_DATA_NAME":"148178","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9758","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"159001","c_DATA_NAME":"159001","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9435","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"159903","c_DATA_NAME":"深证成份交易型开放式指数证券投资基金",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"9436","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"159925",' \
           '"c_DATA_NAME":"南方开元沪深300交易型开放式指数证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9752",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"159948","c_DATA_NAME":"南方创业板交易型开放式指数证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3091","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"159999","c_DATA_NAME":"159999","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9437","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"160105","c_DATA_NAME":"南方积极配置证券投资基金",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"9438","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"160106",' \
           '"c_DATA_NAME":"南方高增长混合型证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8",' \
           '"n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9439","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"160119","c_DATA_NAME":"南方500交易型开放式指数证券投资基金联接基金(LOF)","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9440","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"160123","c_DATA_NAME":"南方中证50债券指数证券投资基金(LOF)",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"9441","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"160127",' \
           '"c_DATA_NAME":"南方新兴消费增长分级股票型证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8",' \
           '"n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9442","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"160128","c_DATA_NAME":"南方金利定期开放债券型证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9443",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"160130","c_DATA_NAME":"南方永利1年定期开放债券型证券投资基金（LOF）",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"9444","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"160131",' \
           '"c_DATA_NAME":"南方聚利1年定期开放债券型证券投资基金（LOF）","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9445",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"160133","c_DATA_NAME":"南方天元新产业股票型证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9446","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"160135","c_DATA_NAME":"南方中证高铁产业指数分级证券投资基金",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"9447","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"160136",' \
           '"c_DATA_NAME":"南方中证国有企业改革指数分级证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9448",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"160137","c_DATA_NAME":"南方中证互联网指数分级证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9923","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"160160","c_DATA_NAME":"160160","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9768","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"160160160","c_DATA_NAME":"160160160",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"3100","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"160801",' \
           '"c_DATA_NAME":"160801","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9812","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"161161","c_DATA_NAME":"161","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9815",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"162162","c_DATA_NAME":"162162","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3084","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"184688","c_DATA_NAME":"基金开元","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3085","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"184698","c_DATA_NAME":"基金天元","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3089","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"184710","c_DATA_NAME":"基金隆元","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9691","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"2","c_DATA_NAME":"2","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3341","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"201070","c_DATA_NAME":"东证资管_201070",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"9753","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"20160802",' \
           '"c_DATA_NAME":"固定收益平台清算接口测试","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8",' \
           '"n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"10088","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"201609","c_DATA_NAME":"三级分级算法测试","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3280",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"20181105","c_DATA_NAME":"20181105","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9452","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"202001","c_DATA_NAME":"南方稳健成长证券投资基金",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"9453","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"202002",' \
           '"c_DATA_NAME":"南方稳健成长贰号证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8",' \
           '"n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9454","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"202003","c_DATA_NAME":"南方绩优成长混合型证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9455",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"202005","c_DATA_NAME":"南方成份精选混合型证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9456","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"202007","c_DATA_NAME":"南方隆元产业主题混合型证券投资基金",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"9457","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"202009",' \
           '"c_DATA_NAME":"南方盛元红利混合型证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8",' \
           '"n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9458","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"202011","c_DATA_NAME":"南方优选价值混合型证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9459",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"202015","c_DATA_NAME":"南方开元沪深300交易型开放式指数证券投资基金联接基金",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"9460","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"202017",' \
           '"c_DATA_NAME":"南方深证成份交易型开放式指数证券投资基金联接基金","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9461",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"202019","c_DATA_NAME":"南方策略优化混合型证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9462","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"202021","c_DATA_NAME":"中证南方小康产业ETF联接基金",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"9463","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"202023",' \
           '"c_DATA_NAME":"南方优选成长混合型证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8",' \
           '"n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9464","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"202025","c_DATA_NAME":"南方上证380交易型开放式指数证券投资基金联接基金","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9465","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"202027","c_DATA_NAME":"南方高端装备灵活配置混合型证券投资基金",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"9466","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"202101",' \
           '"c_DATA_NAME":"南方宝元债券型基金","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8",' \
           '"n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9467","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"202102","c_DATA_NAME":"南方多利增强债券型证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9468",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"202105","c_DATA_NAME":"南方广利回报债券型证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9469","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"202108","c_DATA_NAME":"南方润元纯债债券型证券投资基金",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"9470","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"202202",' \
           '"c_DATA_NAME":"南方避险增值基金","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8",' \
           '"n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9471","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"202211","c_DATA_NAME":"南方恒元保本混合型证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9472",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"202212","c_DATA_NAME":"南方保本混合型证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9473","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"202213","c_DATA_NAME":"南方安心保本混合型证券投资基金",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"9474","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"202301",' \
           '"c_DATA_NAME":"南方现金增利基金","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8",' \
           '"n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9475","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"202303","c_DATA_NAME":"南方理财14天债券型证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9476",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"202305","c_DATA_NAME":"南方理财60天债券型证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9477","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"202307","c_DATA_NAME":"南方收益宝货币市场基金",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"9707","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"216","c_DATA_NAME":"216",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"9763","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"22","c_DATA_NAME":"22",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"9764","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"222","c_DATA_NAME":"222",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"3199","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"222002",' \
           '"c_DATA_NAME":"中国人寿中证500组合","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8",' \
           '"n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3200","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"222003","c_DATA_NAME":"中国人寿固定收益组合","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3201",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"222004","c_DATA_NAME":"中国人寿绝对收益组合","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"10148","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"22tes111","c_DATA_NAME":"22tes111",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"3860","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"250250",' \
           '"c_DATA_NAME":"测试123","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9927","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"2525","c_DATA_NAME":"2525","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"11364",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"30992","c_DATA_NAME":"30992-不要用我的组合","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"10092","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"31184","c_DATA_NAME":"31184","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"11346","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"31459","c_DATA_NAME":"31459","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9692","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"315520","c_DATA_NAME":"赢时胜资产1号","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9694","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"315522","c_DATA_NAME":"赢时胜资产3号","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9712","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"315525","c_DATA_NAME":"赢时胜5号产品","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"10070","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"31606","c_DATA_NAME":"31606","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"11266","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"32253","c_DATA_NAME":"32253","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"10211","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"33abcde","c_DATA_NAME":"33abcde",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"11486","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"34735",' \
           '"c_DATA_NAME":"34735","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"4020","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"449","c_DATA_NAME":"449测试","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9908",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"454567","c_DATA_NAME":"454567","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9778","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"5","c_DATA_NAME":"5","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3088","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"500010","c_DATA_NAME":"基金金元","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3340","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"501053","c_DATA_NAME":"东证资管_501053",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"9479","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"510160",' \
           '"c_DATA_NAME":"中证南方小康产业交易型开放式指数证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9387",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"510290","c_DATA_NAME":"上证380交易型开放式指数证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9480","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"510500","c_DATA_NAME":"中证500交易型开放式指数证券投资基金",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"9481","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"512300",' \
           '"c_DATA_NAME":"中证500医药卫生指数交易型开放式指数证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9482",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"512310","c_DATA_NAME":"中证500工业指数交易型开放式指数证券投资基金",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"9483","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"512330",' \
           '"c_DATA_NAME":"中证500信息技术指数交易型开放式指数证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9484",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"512340","c_DATA_NAME":"中证500原材料指数交易型开放式指数证券投资基金",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"9485","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"513600",' \
           '"c_DATA_NAME":"南方恒生交易型开放式指数证券投资基金","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8",' \
           '"n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9951","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"53453535","c_DATA_NAME":"53453535","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3092",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"555555","c_DATA_NAME":"555555","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9687","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"666","c_DATA_NAME":"666","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"10180","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"6666","c_DATA_NAME":"6666","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9816","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"666666","c_DATA_NAME":"666666","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9711","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"688","c_DATA_NAME":"688","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"4040","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"777449","c_DATA_NAME":"777449","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3093","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"778899","c_DATA_NAME":"778899","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9709","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"86","c_DATA_NAME":"86","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9765","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"8686","c_DATA_NAME":"8686","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9829","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"888888","c_DATA_NAME":"888888","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"10067","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"989903","c_DATA_NAME":"infoset1",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"2957","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"A001",' \
           '"c_DATA_NAME":"A001","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9773","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"A002","c_DATA_NAME":"A002","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9774",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"A003","c_DATA_NAME":"A003","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3104",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"A004","c_DATA_NAME":"A004","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9855",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"A0101","c_DATA_NAME":"TEST","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"10235",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"CR0002","c_DATA_NAME":"CR0002","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"10236","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"CR0003","c_DATA_NAME":"CR0003","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"10238","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"CR00055","c_DATA_NAME":"CR00055",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"10234","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"CR001",' \
           '"c_DATA_NAME":"CR001","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"10237","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"CR0044","c_DATA_NAME":"CR0044","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"10239",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"CRT01","c_DATA_NAME":"CRT01","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"10240",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"CRT03","c_DATA_NAME":"CRT03","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3094",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"EEEEEE","c_DATA_NAME":"EEEEEE","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3102","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"GGT001","c_DATA_NAME":"GGT001","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3103","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"GGT002","c_DATA_NAME":"GGT002","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"10101","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"GP_002","c_DATA_NAME":"GPGP","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"10144","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"HHG","c_DATA_NAME":"HHG","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"10241","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"HLZT01","c_DATA_NAME":"HLZT01","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"10118","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"HT1207","c_DATA_NAME":"HT1207","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3098","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"IK0088","c_DATA_NAME":"IK0088","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3090","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"K1","c_DATA_NAME":"黄金接口测试","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9950","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"K2","c_DATA_NAME":"黄金测试","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3097","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"QT0065","c_DATA_NAME":"QT0065","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9962","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"S07200","c_DATA_NAME":"分级测试测试","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"10084","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"S27923","c_DATA_NAME":"绰瑞中岳基金","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3070","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"11111","c_DATA_NAME":"1111","c_DATA_CODE_P":"S27923",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3052","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"11abcde","c_DATA_NAME":"11abcde","c_DATA_CODE_P":"S27923",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3303","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"45243651","c_DATA_NAME":"测试组合A/B","c_DATA_CODE_P":"S27923",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3064","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"CCCCCC","c_DATA_NAME":"宝马81号","c_DATA_CODE_P":"S27923",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3009","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"bbbe","c_DATA_NAME":"bbbe","c_DATA_CODE_P":"S27923",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9963","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"S37390","c_DATA_NAME":"和聚-陆家嘴","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9960","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"S66401","c_DATA_NAME":"华泰黄河1号定向资产管理计划",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"3096","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"SSSSSS",' \
           '"c_DATA_NAME":"SSSSSS","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"10178","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"TEST","c_DATA_NAME":"TEST","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"10113",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"TY001","c_DATA_NAME":"TY001","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"10243",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"TZ0099","c_DATA_NAME":"TZ0099","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9959","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"WH001","c_DATA_NAME":"外汇交易中心测试","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3095","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"XXXXXX","c_DATA_NAME":"XXXXXX","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3841","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"ZGCP019","c_DATA_NAME":"ZGCP019",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"3842","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"ZGCP067",' \
           '"c_DATA_NAME":"ZGCP067","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8",' \
           '"n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3840","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"ZGCP069","c_DATA_NAME":"ZGCP069","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"9961",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"ZH1207","c_DATA_NAME":"ZH1207","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"10200","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"abcde","c_DATA_NAME":"abcde","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3139","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"asg","c_DATA_NAME":"asdg","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9903","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"ddd","c_DATA_NAME":"ddd","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9779","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"ghgh","c_DATA_NAME":"ghgh","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"9769","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"hhhh","c_DATA_NAME":"hhhh","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"10116","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"kl","c_DATA_NAME":"kl","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3120","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"ldstest2","c_DATA_NAME":"ldstest2",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"3121","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"ldstest3",' \
           '"c_DATA_NAME":"ldstest3","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8",' \
           '"n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3122","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"ldstest4","c_DATA_NAME":"ldstest4","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3123",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"ldstest5","c_DATA_NAME":"ldstest5","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"3087","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"llhh_001","c_DATA_NAME":"llhh_001",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"10091","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"lvhh_0202",' \
           '"c_DATA_NAME":"利率互换测试","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3140","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"sfasd","c_DATA_NAME":"asgd","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3086",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"sgt_test","c_DATA_NAME":"sgt_test","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"10218","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"t11ab","c_DATA_NAME":"t11ab","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"10221","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"tb111abcd","c_DATA_NAME":"tb111abcd",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"10219","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"tb1122",' \
           '"c_DATA_NAME":"tb1122","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"10220","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"tb11abc","c_DATA_NAME":"tb11abc","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"10222",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"tb22ab","c_DATA_NAME":"tb22ab","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"10223","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"tb22abc","c_DATA_NAME":"tb22abc",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"10226","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"tb33ab",' \
           '"c_DATA_NAME":"tb33ab","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"10227","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"tb444a","c_DATA_NAME":"tb444a","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"10230",' \
           '"modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,' \
           '"operator":"","c_DATA_CODE":"tbb111","c_DATA_NAME":"tbb111","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"10228","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"tbt12","c_DATA_NAME":"tbt12","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"10229","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"tbt13","c_DATA_NAME":"tbt13","c_DATA_CODE_P":"ASS_ZQTZJJ",' \
           '"c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[' \
           ']},{"id":"10161","modifier":"","startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04",' \
           '"auditState":0,"operator":"","c_DATA_CODE":"zqzh_001","c_DATA_NAME":"证券转换测试",' \
           '"c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],' \
           '"auditedPostList":[],"oldPostList":[]},{"id":"10183","modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"","c_DATA_CODE":"zqzh_002",' \
           '"c_DATA_NAME":"证券转换","c_DATA_CODE_P":"ASS_ZQTZJJ","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":1,"operator":"","c_DATA_CODE":"ASS_ZYNJJJ",' \
           '"c_DATA_NAME":"职业年金基金","c_DATA_CODE_P":"[root]","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":1,"operator":"","c_DATA_CODE":"ASS_ZYZCCP",' \
           '"c_DATA_NAME":"自营资产产品","c_DATA_CODE_P":"[root]","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":1,"operator":"","c_DATA_CODE":"CLS_ETF",' \
           '"c_DATA_NAME":"ETF型","c_DATA_CODE_P":"[root]","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"modifier":"","startUseDate":"2021-01-08 15:31:04",' \
           '"endUseDate":"2021-01-08 15:31:04","auditState":1,"operator":"","c_DATA_CODE":"CLS_HB",' \
           '"c_DATA_NAME":"货币型","c_DATA_CODE_P":"[root]","c_DATA_TYPE":"1","c_USER_CODE":"1_1_8","n_SOURCE":0,' \
           '"postList":[],"auditedPostList":[],"oldPostList":[]},{"id":"3241","modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":0,"operator":"",' \
           '"c_DATA_CODE":"TEST_0802","c_DATA_NAME":"测试_0802","c_DATA_CODE_P":"CLS_HB","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":1,"operator":"",' \
           '"c_DATA_CODE":"CLS_LJ","c_DATA_NAME":"联接型","c_DATA_CODE_P":"[root]","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":1,"operator":"",' \
           '"c_DATA_CODE":"CLS_PT","c_DATA_NAME":"普通型","c_DATA_CODE_P":"[root]","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]},{"modifier":"",' \
           '"startUseDate":"2021-01-08 15:31:04","endUseDate":"2021-01-08 15:31:04","auditState":1,"operator":"",' \
           '"c_DATA_CODE":"CLS_ZS","c_DATA_NAME":"指数型","c_DATA_CODE_P":"[root]","c_DATA_TYPE":"1",' \
           '"c_USER_CODE":"1_1_8","n_SOURCE":0,"postList":[],"auditedPostList":[],"oldPostList":[]}],"headKeyList":[{' \
           '"key":"C_DATA_CODE","text":"数据代码","align":"L","format":"","serviceId":"","showName":"","isShow":"",' \
           '"width":"","sortable":"","order":"","isExport":"","isFrozen":"","typeCode":"","defaultDictTypeValue":"",' \
           '"dictType":""},{"key":"C_DATA_NAME","text":"数据名称","align":"L","format":"","serviceId":"","showName":"",' \
           '"isShow":"","width":"","sortable":"","order":"","isExport":"","isFrozen":"","typeCode":"",' \
           '"defaultDictTypeValue":"","dictType":""},{"key":"C_USER_CODE","text":"用户名称","align":"L","format":"",' \
           '"showConvert":"true","serviceId":"IUserDataService","showName":"","isShow":"","width":"","sortable":"",' \
           '"order":"","isExport":"","isFrozen":"","typeCode":"","defaultDictTypeValue":"","dictType":""},' \
           '{"key":"C_POST_NAME","text":"岗位名称","align":"L","format":"","serviceId":"","showName":"","isShow":"",' \
           '"width":"","sortable":"","order":"","isExport":"","isFrozen":"","typeCode":"","defaultDictTypeValue":"",' \
           '"dictType":""}],"showConvertAssemble":{"IUserDataService":{"1_1_8":"1.1.8"}},"page":{"pageCount":0,' \
           '"currPage":1,"pageSize":100,"totalNum":0,"usePage":true},"operRes":"Success",' \
           '"listDataClass":"UserPostData","menuId":"UserPostData","retValue":""},"message":"","success":true} '

jsonObj = json.loads(jsonData)

dataList = jsonObj['data']['dataList']

print(dataList)