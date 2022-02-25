const std_result = document.getElementById('std-result');
const std_name = document.getElementById('std-name');
const std_class = document.getElementById('std-class');
const std_roll = document.getElementById('std-roll');
const std_college = document.getElementById('std-college');
const std_bn = document.getElementById('std-bn');
const std_en = document.getElementById('std-en');
const std_math = document.getElementById('std-math');
const std_s = document.getElementById('std-s');
const std_ss = document.getElementById('std-ss');
const std_rel = document.getElementById('std-rel');
const std_photo = document.getElementById('std-photo');

const std_tbl_data = document.getElementById('std-tbl-data');
const modal_std = document.querySelector('.modal-std');
const alert_noti = document.querySelector('.alert-noti');


std_result.addEventListener('submit', function(e){
    e.preventDefault();

    const genders = document.querySelector('input[name="gender"]:checked');

    let name = std_name.value;
    let std_cls = std_class.value;
    let roll = std_roll.value;
    let photo = std_photo.value;
    let college = std_college.value;
    let gender = genders.value;
    let bn = std_bn.value;
    let en = std_en.value;
    let math = std_math.value;
    let s = std_s.value;
    let ss = std_ss.value;
    let rel = std_rel.value;

    let res = new Result;
    let bn_gpa = res.subject(bn).sub_gpa;
    let en_gpa = res.subject(en).sub_gpa;
    let math_gpa = res.subject(math).sub_gpa;
    let s_gpa = res.subject(s).sub_gpa;
    let ss_gpa = res.subject(ss).sub_gpa;
    let rel_gpa = res.subject(rel).sub_gpa;

    let bn_gread = res.subject(bn).sub_gread;
    let en_gread = res.subject(en).sub_gread;
    let math_gread = res.subject(math).sub_gread;
    let s_gread = res.subject(s).sub_gread;
    let ss_gread = res.subject(ss).sub_gread;
    let rel_gread = res.subject(rel).sub_gread;

    let final_cgpa = res.final_res(bn_gpa, en_gpa, math_gpa, s_gpa, ss_gpa, rel_gpa).cgpa;
    console.log(final_cgpa);
    let final_result = res.final_res(bn_gpa, en_gpa, math_gpa, s_gpa, ss_gpa, rel_gpa).final_res;

    let local_data = [];
    local_data = get_data('student');

    local_data.push({
        name: name,
        class: std_cls,
        roll: roll,
        photo: photo,
        college: college,
        gender: gender,
        bn: bn,
        en: en,
        math: math,
        s: s,
        ss: ss,
        rel: rel,
        bn_gpa: bn_gpa,
        en_gpa: en_gpa,
        math_gpa: math_gpa,
        s_gpa: s_gpa,
        ss_gpa: ss_gpa,
        rel_gpa: rel_gpa,
        bn_gread: bn_gread,
        en_gread: en_gread,
        math_gread: math_gread,
        s_gread: s_gread,
        ss_gread: ss_gread,
        rel_gread: rel_gread,
        final_cgpa: final_cgpa,
        final_result: final_result
    })

    if(final_cgpa){
        alert_noti.innerHTML= `<p class="alert alert-success text-center">Done, Successfully add new student result</p>`
        data_send('student', local_data);
        all_results();

        std_name.value = '';
        std_class.value = '';
        std_roll.value = '';
        std_photo.value = '';
        std_college.value = '';
        std_bn.value = '';
        std_en.value = '';
        std_math.value = '';
        std_s.value = '';
        std_ss.value = '';
        std_rel.value = '';
    }else{
        alert_noti.innerHTML= `<p class="alert alert-danger text-center">Please, Input valid data</p>`
    }

})

all_results();

function all_results(){
    let get_result = get_data('student');
    std_tbl_data.innerHTML = ''

    get_result.map((data, index ) => {
        std_tbl_data.innerHTML += `
                    <tr>
                        <td>${index <= 10 ? '0' + (index + 1) : index}</td>
                        <td>${data.name}</td>
                        <td>${data.class}</td>
                        <td>${data.roll}</td>
                        <td>${data.gender}</td>
                        <td>${data.final_cgpa}</td>
                        <td>${data.final_result}</td>
                        <td><img style="width:30px; height:30px;" src="${data.photo}" alt=""></td>
                        <td>
                            <button onclick='view_std(${index})' data-bs-toggle="modal" data-bs-target="#resultmodal" class="btn btn-info btn-sm">View</button>
                            <button onclick='delete_std(${index})' class="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>
        
        
        `
    })
}



function delete_std(index){

    let get_loc_result = get_data('student');

    let conform = confirm('Are you sure ?');
    if(conform){
        get_loc_result.splice(index, 1);
        data_send('student', get_loc_result);
        all_results();
    }else{
         false
    }
    

}



function view_std(index){

    let all_std_data = get_data('student');

    modal_std.innerHTML = `
                <div class="modal-header justify-content-center">
                                <h2>Hi, ${all_std_data[index].name} your result bellow</h2>
                            </div>
                            <div class="modal-body">
                                    <div class="row">
                                        <div class="col-xl-4">
                                            <img class="border border-white border-5 shadow-lg" style="width: 230px; height: 220px;" src="${all_std_data[index].photo}" alt="">
                                        </div>
                                        <div class="col-xl-8">
                                            <h5>Name: ${all_std_data[index].name}</h5>
                                            <h5>Roll: ${all_std_data[index].roll}</h5>
                                            <h5>Class: ${all_std_data[index].class}</h5>
                                            <h5>College: ${all_std_data[index].college}</h5>
                                            <h5>Gender: ${all_std_data[index].gender}</h5>
                                            <h5>CGPA: ${all_std_data[index].final_cgpa}</h5>
                                            <h5>Result: ${all_std_data[index].final_result}</h5>
                                        </div>
                                        <div class="col-xl-12 mt-3">
                                            <table class="table table-bordered text-center table-striped table-dark">
                                                <thead>
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Subject</th>
                                                        <th>Marks</th>
                                                        <th>GPA</th>
                                                        <th>Grade</th>
                                                        <th>CGPA</th>
                                                        <th>Result</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>01</td>
                                                        <td>Bangla</td>
                                                        <td>${all_std_data[index].bn}</td>
                                                        <td>${all_std_data[index].bn_gpa}</td>
                                                        <td>${all_std_data[index].bn_gread}</td>
                                                        <td rowspan="6">${all_std_data[index].final_cgpa}</td>
                                                        <td rowspan="6">${all_std_data[index].final_result}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>02</td>
                                                        <td>English</td>
                                                        <td>${all_std_data[index].en}</td>
                                                        <td>${all_std_data[index].en_gpa}</td>
                                                        <td>${all_std_data[index].en_gread}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>03</td>
                                                        <td>Math</td>
                                                        <td>${all_std_data[index].math}</td>
                                                        <td>${all_std_data[index].math_gpa}</td>
                                                        <td>${all_std_data[index].math_gread}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>04</td>
                                                        <td>Science</td>
                                                        <td>${all_std_data[index].s}</td>
                                                        <td>${all_std_data[index].s_gpa}</td>
                                                        <td>${all_std_data[index].s_gread}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>05</td>
                                                        <td>Social Science</td>
                                                        <td>${all_std_data[index].ss}</td>
                                                        <td>${all_std_data[index].ss_gpa}</td>
                                                        <td>${all_std_data[index].ss_gread}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>06</td>
                                                        <td>Religion</td>
                                                        <td>${all_std_data[index].rel}</td>
                                                        <td>${all_std_data[index].rel_gpa}</td>
                                                        <td>${all_std_data[index].rel_gread}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                            </div>
                            <div class="modal-footer"></div>
    
    
    `

}