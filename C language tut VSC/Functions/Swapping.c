// Functions to use swapping operation of variables using callby function and using pointers....

#include <stdio.h>

void swap(int *, int *);

int main()
{
    int n1, n2;
    n1= 10;
    n2 = 20;

    printf("\nValues before swapping : ");
    printf("\nValue of n1 is : %d", n1);
    printf("\nValue of n2 is : %d", n2);

    swap(&n1, &n2);
    printf("\nValue of n1 is : %d", n1);
    printf("\nValue of n2 is : %d", n2);

    return 0;
}
void swap(int *x, int *y)
{
    int temp;
    temp = *x;
    *x = *y;
    *y = temp;

    printf("\nValues after swapping : ");
    printf("\nValue of x is : %d", *x);
    printf("\nValue of y is : %d", *y);
}


