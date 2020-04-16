import request from '@/utils/request'
const group_name = 'position'
export default {
    getAllByPage(positionVo) {
        return request({
            url: `${group_name}/page`,
            method: 'post',
            data: positionVo
        })
    },
    getAllCity() {
        return request({
            url: `${group_name}/cities`,
            method: 'get'
        })
    },
    getSalary() {
        return request({
            url: `${group_name}/salaries`,
            method: 'get'
        })
    },
    getJobTitle() {
        return request({
            url: `${group_name}/job_title`,
            method: 'get'
        })
    },
    getDistrictByCity(city) {
        return request({
            url: `${group_name}/district/${city}`,
            method: 'get'
        })
    },
    getHistogramAndLineData() {
        return request({
            url: `${group_name}/histogram`,
            method: 'get'
        })
    },
    getAnalysisSalary() {
        return request({
            url: `${group_name}/analysis/salary`,
            method: 'get'
        })
    },
    exPortAll() {
        //文件下载，需要设定请求头
        return request({
            url: `${group_name}/excel`,
            headers: {
                'Content-Type': 'application/json; application/octet-stream'
            },
            responseType: 'arraybuffer',
            method: 'get'
        })
    },
    exPortPage(Pageata) {
        //文件下载，需要设定请求头
        return request({
            url: `${group_name}/excel/page`,
            data: {
                "data": Pageata
            },
            responseType: 'arraybuffer',
            method: 'post'
        })
    }

}