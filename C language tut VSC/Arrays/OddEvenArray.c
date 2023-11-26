// C program to find the odd and even numbers in the array.

#include <stdio.h>
#include <stdlib.h>
#define max 60

int main()
{
    int i, j, k, n;
    int arr[max];

    printf("\nHow many numbers do you want in the array : ");
    scanf("%d", &n);

    printf("\nEnter the %d numbers : ", n);
    
    for(i=0;i<n;i++)
    {
        scanf("%d", &arr[i]);
    }

    printf("\nElements in array are : \n" );
    for(i=0;i<n;i++)
    {
        printf("%5d", arr[i]);
    }


    printf("\nEven numbers in the array are : \n");
    for(i=0;i<n;i++)
    {
        if(arr[i]%2==0)
        {
            printf("%5d", arr[i]);

        }
    }

    printf("\nOdd numbers in the array are : \n");
    for(j=0;j<n;j++);
    {
        if(arr[j]%2 != 0)
        {
            printf("%5d", arr[j]);  // isn't showing the output for odd numbers.
        }
    }
    return 0;
}