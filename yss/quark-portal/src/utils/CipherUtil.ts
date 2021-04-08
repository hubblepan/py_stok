
    export const  EncodeByPassword = (password) =>
		{
			var resultString = null; // 返回结果
			var bpass1 = new Array(200);
			for(var i = 0; i < 200 ; i++){
				bpass1[i] = 0;
			}

			var ltmp=0; // 。。。
			var bpass = stringToBytes(password);
			ltmp = bpass.length - 1;
//			passwordLen = ltmp;
			for (var i = 0; i <= ltmp; i++) {
				bpass1[(ltmp + 2) - i] = bpass[i];
			} // end for

			bpass1[1] = parseInt(ltmp / 2);
			bpass1[198] = ((ltmp + 1) - bpass1[1]);

			ltmp = 0;
			for (var i = 0; i <= 198; i++) {
				ltmp += bpass1[i];
				if (0 == (i % 2)) {
					bpass1[i] = intToByte((255 - bpass1[i]));
					ltmp += bpass1[i];
				} // end if
			} //end for

			bpass1[i] = intToByte(((ltmp + bpass1[0] + bpass1[i - 1]) % 256));

			resultString = byteArrayToHexString(bpass1);

			return resultString.toUpperCase();
		}

		const byteArrayToHexString = (b) =>
		{
			var result = "";
			for (var i = 0; i < b.length; i++) {
				result += (byteToHexString(b[i]));
			} // end for

			return result;
		}

		var HEXDIGITS = ["0", "1", "2", "3", "4", "5","6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
		const byteToHexString = (b) => {
			var d1 = 0; //。。。
			var d2 = 0; // 。。。
			var n = b; // 传进来的字节
			if (n < 0){
				n += 256;
			} // end if

			d1 = parseInt(n / 16);
			d2 = n % 16;
			return HEXDIGITS[d1] + HEXDIGITS[d2];
		}


		const intToByte = (i) => {
	        var b = i & 0xFF;
	        var c = 0;
	        if (b >= 128) {
	            c = b % 128;
	            c = -1 * (128 - c);
	        } else {
	            c = b;
	        }
	        return c;
	    }

      const stringToBytes = (str) => {
			var bytes = new Array();
			var len, c;
			len = str.length;
			for(var i = 0; i < len; i++) {
				c = str.charCodeAt(i);
				if(c >= 0x010000 && c <= 0x10FFFF) {
					bytes.push(((c >> 18) & 0x07) | 0xF0);
					bytes.push(((c >> 12) & 0x3F) | 0x80);
					bytes.push(((c >> 6) & 0x3F) | 0x80);
					bytes.push((c & 0x3F) | 0x80);
				} else if(c >= 0x000800 && c <= 0x00FFFF) {
					bytes.push(((c >> 12) & 0x0F) | 0xE0);
					bytes.push(((c >> 6) & 0x3F) | 0x80);
					bytes.push((c & 0x3F) | 0x80);
				} else if(c >= 0x000080 && c <= 0x0007FF) {
					bytes.push(((c >> 6) & 0x1F) | 0xC0);
					bytes.push((c & 0x3F) | 0x80);
				} else {
					bytes.push(c & 0xFF);
				}
			}
			//在处理一次，保证与javabyte相同
			for(var j = 0; j < bytes.length; j++) {
				bytes[j] = intToByte(bytes[j]);
			}
			return bytes;
		}
