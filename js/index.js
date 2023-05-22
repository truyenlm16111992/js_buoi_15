// Format Money 
function funcFormatMoney(money, formatType) {
    var formatObj;
    switch (formatType) {
        case "VND":
            formatObj = new Intl.NumberFormat(
                'vi-VN',
                {
                    style: 'currency',
                    currency: 'VND',
                    currencyDisplay: 'code'
                }
            );
            return formatObj.format(money);
        case "USD":
            formatObj = new Intl.NumberFormat(
                'en-US',
                {
                    style: 'currency',
                    currency: 'USD',
                    currencyDisplay: 'narrowSymbol'
                }
            );
            return formatObj.format(money);
        default:
            return "";
    }
}
// Bài tập 1
function funcGetAreaScore(areaCode) {
    switch (areaCode) {
        case "A":
            return 2;
        case "B":
            return 1;
        case "C":
            return 0.5;
        default:
            return 0;
    }
}
function funcGetObjectScore(objCode) {
    switch (objCode) {
        case "1":
            return 2.5;
        case "2":
            return 1.5;
        case "3":
            return 1;
        default:
            return 0;
    }
}
function funcGetFinalClass(admScore, score1, score2, score3, addScore) {
    var result = {
        "total":"",
        "class": "",
        "note": ""
    };
    result.total = score1 + score2 + score3 + addScore;
    if (result.total >= admScore && score1 > 0 && score2 > 0 && score3 > 0)
        result.class = "Đậu";
    else {
        result.class = "Rớt";
        if (result.total < admScore)
            result.note = "Tổng điểm nhỏ hơn điểm chuẩn";
        else
            result.note = "Có điểm nhỏ hơn hoặc bằng 0";
    }
    return result;
}
document.getElementById("btnExecute_b1").onclick = function () {
    var domAdmScore = document.getElementById("tbDiemChuan");
    var domScoreObj1 = document.getElementById("tbDiem1");
    var domScoreObj2 = document.getElementById("tbDiem2");
    var domScoreObj3 = document.getElementById("tbDiem3");
    var admScore = 0, score1 = 0, score2 = 0, score3 = 0, addScore;
    addScore = funcGetAreaScore(document.getElementById("cbKhuVuc").value) + funcGetObjectScore(document.getElementById("cbDoiTuong").value);
    if (+domAdmScore.value)
        admScore = +domAdmScore.value;
    if (+domScoreObj1.value)
        score1 = +domScoreObj1.value;
    if (+domScoreObj2.value)
        score2 = +domScoreObj2.value;
    if (+domScoreObj3.value)
        score3 = +domScoreObj3.value;
    var result = funcGetFinalClass(admScore, score1, score2, score3, addScore);
    document.getElementById("result_b1").innerHTML = "Bạn đã " + result.class.toLowerCase() + ". " + (result.class == "Đậu" ? "Tổng điểm bạn là " + result.total.toLocaleString() : "Do " + result.note.toLowerCase());
}
// Bài tập 2
function funcCalcElectricBill(numKw) {
    var arrRangeNumKw = [50, 50, 100, 150], arrPrice = [500, 650, 850, 1100, 1300];
    var i = 0, numKwTmp = 0, totalPrice = 0;
    while (numKw >= (numKwTmp + arrRangeNumKw[i]) && i < arrRangeNumKw.length) {
        totalPrice += arrRangeNumKw[i] * arrPrice[i];
        numKwTmp += arrRangeNumKw[i];
        i++;
    }
    totalPrice += (numKw - numKwTmp) * arrPrice[i];
    return totalPrice;
}
document.getElementById("btnExecute_b2").onclick = function () {
    var domName = document.getElementById("tbHoTenB2");
    var domNumKw = document.getElementById("tbSoDien");
    var numKw = 0;
    if (+domNumKw.value)
        numKw += domNumKw.value;
    document.getElementById("result_b2").innerHTML = "Họ tên: " + domName.value + "; Tiền điện: " + funcFormatMoney(funcCalcElectricBill(numKw),"VND");
}
//Bài tập 3
function funcCalcPersonalTax(totalIncome, numDependents) {
    var totalIncomeTax = totalIncome - (4e+6 + numDependents * 1.6e+6);
    if (totalIncomeTax > 0) {
        var arrRangeIncomeTax = [60e+6, 60e+6, 90e+6, 174e+6, 240e+6, 336e+6], arrRangeTax = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35];
        var i = 0, totalIncomeTaxTemp = 0, tax = 0;
        while (totalIncomeTax >= (totalIncomeTaxTemp + arrRangeIncomeTax[i]) && i < arrRangeIncomeTax.length) {
            tax += arrRangeIncomeTax[i] * arrRangeTax[i];
            totalIncomeTaxTemp += arrRangeIncomeTax[i];
            i++;
        }
        tax += (totalIncomeTax - totalIncomeTaxTemp) * arrRangeTax[i];
        return tax;
    } else
        return 0;
}
document.getElementById("btnExecute_b3").onclick = function () {
    var domName = document.getElementById("tbHoTenB3");
    var domTotalIncome = document.getElementById("tbTongThuNhapNam");
    var domNumDependents = document.getElementById("tbSoNguoiPhuThuoc");
    var totalIncome = 0, numDependents = 0;
    if (+domTotalIncome.value)
        totalIncome += domTotalIncome.value;
    if (+domNumDependents.value)
        numDependents += domNumDependents.value;
    document.getElementById("result_b3").innerHTML = "Họ tên: " + domName.value + "; Tiền thuế thu nhập cá nhân: " + funcFormatMoney(funcCalcPersonalTax(totalIncome, numDependents),"VND");
}
//Bài tập 4
function funcGetInvoiceFee(customerType) {
    switch (customerType) {
        case 1:
            return 4.5;
        case 2:
            return 15;
        default:
            return 0;
    }
}
function funcGetBasicServiceFee(customerType, numConnection) {
    debugger;
    switch (customerType) {
        case 1:
            return 20.5;
        case 2:
            return 75 + (numConnection > 10 ? (numConnection - 10) * 5 : 0);
        default:
            return 0;
    }
}
function funcGetPremiumChannelFee(customerType, numChannel) {
    switch (customerType) {
        case 1:
            return 7.5 * numChannel;
        case 2:
            return 50 * numChannel;
        default:
            return 0;
    }
}
function funcCalcCableTVBill(customerType, numChannel, numConnection) {
    return funcGetInvoiceFee(customerType) + funcGetBasicServiceFee(customerType, numConnection) + funcGetPremiumChannelFee(customerType, numChannel);
}
document.getElementById("cbLoaiKhachHang").onchange = function () {
    var domContainerNumConnect = document.getElementById("tbSoKetNoi").parentElement;
    if (+this.value == 2) {
        domContainerNumConnect.classList.remove("d-none");
    } else
        domContainerNumConnect.classList.add("d-none");
}
document.getElementById("btnExecute_b4").onclick = function () {
    var domCustomberType = document.getElementById("cbLoaiKhachHang");
    var domCustomerCode = document.getElementById("tbMaKhachHang");
    var domNumChannel = document.getElementById("tbSoKenhCaoCap");
    var domNumConnection = document.getElementById("tbSoKetNoi");
    var customerType = 0, numChannel = 0, numConnection = 0;
    if (+domCustomberType.value == 0) {
        alert("Vui lòng chọn loại khách hàng!");
        return 0;
    } else
        customerType = +domCustomberType.value;
    if (+domNumChannel.value)
        numChannel = +domNumChannel.value;
    if (+domNumConnection.value)
        numConnection = +domNumConnection.value;
    document.getElementById("result_b4").innerHTML = "Mã khách hàng: " + domCustomerCode.value + "; Tiền cáp: " + funcFormatMoney(funcCalcCableTVBill(customerType, numChannel, numConnection), "USD");
}