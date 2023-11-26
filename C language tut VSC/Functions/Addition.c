// Function without argument and without return type

#include <stdio.h>
#include <stdlib.h>

void adddata();
int main()
{
    adddata();

    return 0;
}
void adddata()
{
    int a,b, sum;
    printf("Enter the numbers do you want to add : \n");
    scanf("%d%d", &a, &b);

    sum = a + b;
    printf("Addition of %d and %d is %d", a, b, sum);
}