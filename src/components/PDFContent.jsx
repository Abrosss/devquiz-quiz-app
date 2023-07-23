// PDFContent.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import Circle from '../assets/circle.png'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',

  },
  section: {
    margin: 50,
    marginTop:10,
    padding: 10,
    flexGrow: 1,

  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  icon: {
    width: 10, 
    height: 10,
    marginRight: 5,
  },
  option: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: '12',
    marginLeft: 20,
    marginBottom: 5
  },
  imageContainer: {
    flexShrink: 0, 
    marginLeft: 10, 
    marginTop: 5, 
  },
  image: {
    width: 100,
    height: 100,
  },
  container: {
    flexDirection: 'column'
  },
  innerContainer: {
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    marginBottom: 20, 
  },
  questionContainer: {
    flexGrow: 1, 
  },
  question: {
    marginBottom: 10,
    fontSize: '14'
  }
});

const PDFContent = ({ data }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>{data.quizTitle}</Text>
          <View style={styles.container}>
            {data && data.questions && data.questions.map((question, index) => (
              <>
              <View style={styles.innerContainer}>
              <View style={styles.questionContainer}>
                  <Text style={styles.question}>
                    {index + 1}. {question.title}
                  </Text>
                  {question.options.map((option, optionIndex) => (
                    <View style={styles.option}>
                      <Image style={styles.icon} src={Circle} />
                      <Text key={optionIndex} style={styles.optionItem}>
                        {option.title}
                      </Text>

                    </View>
                  ))}
                </View>

                {question.image &&
                  <View style={styles.imageContainer}>
                    <Image
                      style={styles.image}
                      src={question.image}
                    />
                  </View>
                }
              </View>
              

              </>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFContent;
