/** ==================== 各种正则 ==================== */
var formatValid = {
    /**
     * 电话号码验证，包括（包括手机，固定电话，带区号，不带区号）
     * @param obj
     * @returns {boolean}
     */
    isTelephone: function (obj) {
        var pattern = /(^[0-9]{3,4}-[0-9]{3,8}$)|(^[0-9]{3,4}-[0-9]{3,4}-[0-9]{3,4}$)|(^[0-9]{3,8}$)|(^[0−9]3,4[0-9]{3,8}$)|(^0{0,1}1[0-9]{10}$)/;
        if (!pattern.test(obj)) {
            return false;
        } else {
            return true;
        }
    },
    /**
     * 邮箱格式校验
     * @param obj
     * @returns {boolean}
     */
    isEmail: function (obj) {
        var pattern = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (!pattern.test(obj)) {
            return false;
        } else {
            return true;
        }
    },
    /**
     * 身份证格式校验
     * @param obj
     * @returns {boolean}
     */
    isIdentityCard: function (idNumber) {
        var vcity = {
            11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古',
            21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏',
            33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南',
            42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆',
            51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃',
            63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外'
        }

        // 检查号码是否符合规范，包括长度，类型
        var isCardNo = function (obj) {
            // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
            var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
            if (reg.test(obj) === false) {
                return false;
            }
            return true;
        }

        // 取身份证前两位,校验省份
        var checkProvince = function (obj) {
            var province = obj.substr(0, 2);
            if (vcity[province] == undefined) {
                return false;
            }
            return true;
        }

        // 检查生日是否正确
        var checkBirthday = function (obj) {
            var len = obj.length;
            // 身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
            if (len == '15') {
                var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
                var arr_data = obj.match(re_fifteen);
                var year = arr_data[2];
                var month = arr_data[3];
                var day = arr_data[4];
                var birthday = new Date('19' + year + '/' + month + '/' + day);
                return verifyBirthday('19' + year, month, day, birthday);
            }
            // 身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
            if (len == '18') {
                var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
                var arr_data = obj.match(re_eighteen);
                var year = arr_data[2];
                var month = arr_data[3];
                var day = arr_data[4];
                var birthday = new Date(year + '/' + month + '/' + day);
                return verifyBirthday(year, month, day, birthday);
            }
            return false;
        };

        // 校验日期
        var verifyBirthday = function (year, month, day, birthday) {
            var now = new Date();
            var now_year = now.getFullYear();
            // 年月日是否合理
            if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
                // 判断年份的范围（3岁到100岁之间)
                var time = now_year - year;
                if (time >= 0 && time <= 130) {
                    return true;
                }
                return false;
            }
            return false;
        };

        // 校验位的检测
        var checkParity = function (obj) {
            // 15位转18位
            obj = changeFivteenToEighteen(obj);
            var len = obj.length;
            if (len == '18') {
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                var cardTemp = 0, i, valnum;
                for (i = 0; i < 17; i++) {
                    cardTemp += obj.substr(i, 1) * arrInt[i];
                }
                valnum = arrCh[cardTemp % 11];
                if (valnum == obj.substr(17, 1)) {
                    return true;
                }
                return false;
            }
            return false;
        };

        // 15位转18位身份证号
        var changeFivteenToEighteen = function (obj) {
            if (obj.length == '15') {
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                var cardTemp = 0, i;
                obj = obj.substr(0, 6) + '19' + obj.substr(6, obj.length - 6);
                for (i = 0; i < 17; i++) {
                    cardTemp += obj.substr(i, 1) * arrInt[i];
                }
                obj += arrCh[cardTemp % 11];
                return obj;
            }
            return obj;
        };

        // 校验长度，类型
        if (isCardNo(idNumber) === false) {
            return false;
        }
        // 检查省份
        if (checkProvince(idNumber) === false) {
            return false;
        }
        // 校验生日
        if (checkBirthday(idNumber) === false) {
            return false;
        }
        // 检验位的检测
        if (checkParity(idNumber) === false) {
            return false;
        }
        return true;
    },
    validateEmail: function (val) {
        let re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/; // (字母、数字、下划线、-、. )@(字母、数字、-)
        return re.test(val);
    },

    validateTel: function (val) {
        let re = /^0\d{2,3}-?\d{7,8}$/; // 0开头2~3位区号，可以加-（也可不加），加上7~8位数字
        return re.test(val);
    },

    validateMobile: function (val) {
        let re = /^1\d{10}$/; // 1开头的11位数字
        return re.test(val);
    },

    /**
     * 不允许输入特殊字符
     * */
    validateText: function (val) {
        let re = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
        return re.test(val);
    },

    /**
     * 输入手机号的校验
     * */
    validatePhone: function (val) {
        let re = /^0?1[3|4|5|7|8]\d{9}$/;
        return re.test(val);
    },

    /**
     * 输入身份证号的校验
     * */
    validateCard: function (val) {
        let re = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        return re.test(val);
    }
}