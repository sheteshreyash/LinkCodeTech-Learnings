// C program to find the salary using array and display greater and smaller salary of employee

#include <stdio.h>  
#include <stdlib.h>
#define max 50

int main()
{
    int arr[max];
    int i,min,maxi,sum,n;
    float avg;

    printf("How many salaries do you want to display : ");
    scanf("%d", &n);

    printf("\nEnter the %d salaries : \n", n);

    for (i=0;i<n;i++)
    {
        scanf("%d",&arr[i]);
    }

    printf("\nSalaries in array are : ");

    for(i=0;i<n;i++)
    {
        printf("%5d", arr[i]);
    }
    // start of min and max for loop
    for(i=0;i<n;i++)
    {
        min=arr[0];
        if(arr[i]<min)
        {
            min=arr[i];
        }

        maxi=arr[0];
        if(arr[i]>maxi)
        {
            maxi=arr[i];
        }
    }
    printf("\nMinimum salary is:- %d", min);
    printf("\nMaximum salary is:- %d", maxi);

    return 0;
}
