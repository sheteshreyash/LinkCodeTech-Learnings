// C program to display marksheet of multiple students using structure

#include <stdio.h>
#include <stdlib.h>
#define max 60

struct Student 
{
    int rno;
    int sub1, sub2, sub3, total;
    char name[10];
    float perct;
};

int main()
{
    struct Student stud1[max];
    int i, n;
    
    printf("\nHow many students data do you want to store : \n");
    scanf("%d", &n);
    
    for(i=0;i<n;i++)
    {
        printf("\nEnter the Roll no of student : \n");
        scanf("%d", &stud1[i].rno);

        printf("\nEnter the Name of the student : \n");
        scanf("%s", stud1[i].name);

        printf("\nEnter the marks of the student for Chemistry, Physics and Mathemactics : \n");
        scanf("%d%d%d", &stud1[i].sub1, &stud1[i].sub2, &stud1[i].sub3);
        
        stud1[i].total = stud1[i].sub1 + stud1[i].sub2 + stud1[i].sub3;
        stud1[i].perct = stud1[i].total/3;
    }
    
    for(i=0;i<n;i++)
    {
        printf("\n-------Marksheet-------\n");  // to display marksheet

        printf("\n\t\tRoll No\t\t : %d", stud1[i].rno);
        printf("\n\t\tName\t\t : %s", stud1[i].name);
        printf("\n\t\tChemistry\t : %d", stud1[i].sub1);
        printf("\n\t\tPhysics\t\t : %d", stud1[i].sub2);
        printf("\n\t\tMathematics\t : %d", stud1[i].sub3);
        printf("\n\t\tTotal\t\t : %d", stud1[i].total);
        printf("\n\t\tPercentage\t : %f", stud1[i].perct);
    }
    return 0;
}