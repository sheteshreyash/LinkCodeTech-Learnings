// Enter any name, find its length and enter its elements in reverse order

#include <stdio.h>
#include <stdlib.h>

int main()
{
    char str[10];
    int i,l=0;
    printf("\nEnter any String : \n");
    scanf("%s", str);

    for(i=0;str[i]!='\0';i++)   // '\0' is null value
    {
        l++;
    }
    printf("\nLength of your name is : %d\n", l);

    printf("\nReverse of the string is : \n");

    for(i=l-1;i>=0;i--)
    {
       printf("%c", str[i]);
    }    
    
    return 0;
}