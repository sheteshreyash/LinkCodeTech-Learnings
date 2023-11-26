#include <stdio.h>
#include <stdlib.h>

int main()
{
    int arr[5] = {10, 20, 30, 40, 50};
    int *p1=&arr;                                 //wrong progg
    int i;

    printf("\nFirst element : %d" , *p1);
    printf("\nSecond element : %d" , *p1+1);
    printf("\nThird element : %d\n" , *(p1+1));

    printf("\n---Using Loops-----\n");

    for(i=0;i<5;i++)
    {
        printf("Value %d with address %u is : " , *(p1+i), (p1+i));
    }
    printf("\n-----for reverse order-----\n");
    
    for(i=5;i>0;i--)
    {
        printf("Value %d with address %u is : " , *(p1-i), (p1-i));
    }

    return 0;
}