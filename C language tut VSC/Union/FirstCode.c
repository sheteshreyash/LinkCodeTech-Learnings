// C program to Create multiple accounts and perform various operations using union.

#include <stdio.h>
#include <stdlib.h>

struct  Student
{
    int rno;
    char snm[10];
    float perct;
};

union Employee
{
    int eid;
    char enm[10];
    float esal;
};

int main()
{
    struct Student stud;
    union Employee emp;

    printf("\nEnter Employee ID : ");
    scanf("%d", &emp.eid);
    printf("Employee ID is : %d\n", emp.eid);

    printf("\nEnter Employee name : ");
    scanf("%s", emp.enm);
    printf("Name of Employee : %s\n", emp.enm);

    printf("\nEnter Employee salary : ");
    scanf("%f", &emp.esal);
    printf("Employee salary is : %f\n", emp.esal);

    return 0;
}

