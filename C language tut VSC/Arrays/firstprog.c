// C program in arrays to arrange the elements in the array and display it in reverse order.

#include <stdio.h>
#include <stdlib.h>
#define max 50

int main()
{
    int arr[max];
    int i, n;
    printf("How many numbers do you want in the array : ");
    scanf("%d", &n);

    printf("\nEnter these numbers : ");

    for(i=0;i<n;i++)
    {
        scanf("%d", &arr[i]);
    }
    printf("\nElements in array are : " );

    for(i=0;i<n;i++)
    {
        printf("%5d", arr[i]);
    }
    printf("\nFor reverse order : ");

    for(i=(n-1);i>=0;i--)
    {
        printf("%5d", arr[i]);
    }
    return 0;
}