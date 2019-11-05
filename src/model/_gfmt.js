let _gfmt = {
    cd(times){ // changeDate to ms 时间(年月日分时秒) -> 为毫秒数
        return new Date(times.toString()).getTime();
    }
}
export default _gfmt;