// display a student marksheet using structures in c

#include <stdio.h>
#include <stdlib.h>

struct Student 
{
    int rno;
    int sub1, sub2, sub3, total;
    char name[10];
    float perct;
};

int main()
{
    struct Student stud;
    printf("\nEnter the Roll no of student : \n");
    scanf("%d", &stud.rno);

    printf("\nEnter the Name of the student : \n");
    scanf("%s", stud.name);

    printf("\nEnter the marks of the student for Chemistry, Physics and Mathemactics : \n");
    scanf("%d%d%d", &stud.sub1, &stud.sub2, &stud.sub3);

    stud.total = stud.sub1 + stud.sub2 + stud.sub3;
    stud.perct = stud.total/3;

    printf("\n-------Marksheet-------\n");

    printf("\n\t\tRoll No\t\t : %d", stud.rno);
    printf("\n\t\tName\t\t : %s", stud.name);
    printf("\n\t\tChemistry\t : %d", stud.sub1);
    printf("\n\t\tPhysics\t\t : %d", stud.sub2);
    printf("\n\t\tMathematics\t : %d", stud.sub3);
    printf("\n\t\tTotal\t\t : %d", stud.total);
    printf("\n\t\tPercentage\t : %f", stud.perct);
}