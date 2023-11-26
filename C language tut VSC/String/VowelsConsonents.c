// Enter any string and count vowels, consonents in the string

#include <stdio.h>
#include <stdlib.h>
#define max 30
int main()
{
    char name[max];
    int i, x,vcnt=0, ccnt=0;
    printf("How many elements do you want in the string ? \n");
    scanf("%d", &x);
    printf("\nEnter any name : \n");
    scanf("%s", name);

    for(i=0;name[i]!='\0';i++)
    {
        if((name[i]=='a')||(name[i]=='e')||(name[i]=='i')||(name[i]=='o')||(name[i]=='u'))
        {
            vcnt++;
        }
        else
        {
            ccnt++;
        }
    }
    printf("\nVowels in the string are : %d\n", vcnt);
    printf("\nConsonents in the string are : %d", ccnt);
    
    return 0;
}