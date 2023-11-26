// Enter any name and print length of the name 

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
    printf("\nLength of your name is : %d", l);

    return 0;
}