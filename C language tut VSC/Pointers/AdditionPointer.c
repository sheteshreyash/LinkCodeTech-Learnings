#include <stdio.h>
#include <stdlib.h>

int main()
{                            // Wrong code
    int n1, n2, add;
    int *p1, *p2, *res;

    p1= &n1;
    p2= &n2;
    res=&add;

    printf("Enter the value of n1 and n2 : ");
    scanf("%d%d", &n1, &n2);
    res = *p1 + *p2;

    return 0;
}