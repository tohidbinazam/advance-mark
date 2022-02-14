function Result(){
    this.subject = function(marks){
        let sub_gpa;
        let sub_gread;

        if(marks >= 0 && marks < 33){
            sub_gpa = 0;
            sub_gread = 'F';
        }else if(marks >= 33 && marks < 40){
            sub_gpa = 1;
            sub_gread = 'D';
        }else if(marks >= 40 && marks < 50){
            sub_gpa = 2;
            sub_gread = 'C';
        }else if(marks >= 50 && marks < 60){
            sub_gpa = 3;
            sub_gread = 'B';
        }else if(marks >= 60 && marks < 70){
            sub_gpa = 3.5;
            sub_gread = 'A-';
        }else if(marks >= 70 && marks < 80){
            sub_gpa = 4;
            sub_gread = 'A';
        }else if(marks >= 80 && marks <= 100){
            sub_gpa = 5;
            sub_gread = 'A+';
        }else{
            sub_gpa = 'invalid';
            sub_gread = 'invalid';
        }


        return{
            sub_gpa : sub_gpa,
            sub_gread : sub_gread
        }

    }


    this.final_res = function(bn, en, math, s, ss, rel){
        let cgpa = (bn + en + math + s + ss + rel) / 6;
        let final_gread;

        if(bn == 0 || en == 0 || math == 0 || s == 0 || ss == 0 || rel == 0 ){
            cgpa = 0;
            final_gread = 'F';
        }else if(cgpa >= 1 && cgpa < 2){
            final_gread = 'D';
        }else if(cgpa >= 2 && cgpa < 3){
            final_gread = 'C';
        }else if(cgpa >= 3 && cgpa < 3.5){
            final_gread = 'B';
        }else if(cgpa >= 3.5 && cgpa < 4){
            final_gread = 'A-';
        }else if(cgpa >= 4 && cgpa < 5){
            final_gread = 'A';
        }else if(cgpa == 5){
            final_gread = 'A+';
        }else{
            cgpa = 'invalid';
            final_gread = 'invalid';
        }

        return{
            cgpa : cgpa == 'invalid' ? false : cgpa.toFixed(2),
            final_res : final_gread
        }
    }
}