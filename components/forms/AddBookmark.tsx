import React, {useState, useEffect} from 'react';
import { Dimensions, StyleSheet, Text, TextInput,  TouchableOpacity,  View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik'
import * as Yup from 'yup'
import { ThemedText } from '../ThemedText';
import { Gap } from '../Gap';
import { Row } from '../Row';
import { Button } from '../Button';
import { BookmarkType, BookmarkTypeGroup } from '@/types/Bookmark';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Item: any = Picker.Item;

type Props = {
    handleSave:()=>void
    handleCancel:()=>void
}

// Set validation rules.
// const urlPattern = /^(https?:\/\/)?([^\s$.?#].[^\s]*)$/i
const urlRegex = /^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/g;
const newBookmarkSchema = Yup.object().shape({
    title: Yup.string().required('Title is required')
    .max(30, 'Maximum 30 characters allowed'),
    url: Yup.string().required('url is required').matches(urlRegex, 'Invalid URL format'),
    category: Yup.string(),
    newCateogry:Yup.string()
  })

  // Set initial values.
const initialValues = { title: '', url: '', category:'A', newCategory:'' }

export function AddBookMark({ handleSave, handleCancel }:Props) {
    const [value, setValue] = useState('key1');
    const [newCategory, setNewCategory] = useState(false)
    const [bookmarks, setBookmarks] = useState<BookmarkTypeGroup[]>();
    const [categories, setCategories] = useState<string[]>()

    const handleSubmission = (values:any) => {
        if(values.newCategory && categories?.includes(values.newCategory)){
            bookmarks?.map((item, index)=>{
                if(item.category===values.newCategory){
                    const bookData = bookmarks
                    bookData[index].items.push({
                        category:values.newCategory,
                        id:bookData[index].items.length+1,
                        title:values.title,
                        url:values.url
                    })
    
                    setBookmarks(bookData)
                    AsyncStorage.setItem('bookmarks', JSON.stringify(bookData))
                }
            })
        }else  if(values.newCategory && !categories?.includes(values.newCategory)){
            const bookData = bookmarks
             bookData?.push({
                category:values.newCategory,
                items:[{
                    category:values.newCategory,
                    id:1,
                    title:values.title,
                    url:values.url
                }]
             })
             setBookmarks(bookData)
             AsyncStorage.setItem('bookmarks', JSON.stringify(bookData))
        }else{
            bookmarks?.map((item, index)=>{
                if(item.category===values.category){
                    const bookData = bookmarks
                    bookData[index].items.push({
                        category:values.newCategory,
                        id:bookData[index].items.length+1,
                        title:values.title,
                        url:values.url
                    })
    
                    setBookmarks(bookData)
                    AsyncStorage.setItem('bookmarks', JSON.stringify(bookData))
                }
            })
        }
        handleSave()
    }

  useEffect(()=>{
    async function getAllBookmarks() {
      // await AsyncStorage.setItem('bookmarks', JSON.stringify(data2))
      const allKeys = await AsyncStorage.getItem('bookmarks');
      if(allKeys){
        const allDataParsed = JSON.parse(allKeys)
        setBookmarks(allDataParsed)
        const categoriesArray = allDataParsed.map((group:BookmarkType) => group.category);
        setCategories(categoriesArray)
      }
    }
  
    getAllBookmarks()
    },[])
  return (
    <>
        <ThemedText type='subtitle'>Add Bookmark</ThemedText>
        <Gap size={10} />

        <Formik
          initialValues={initialValues}
          validationSchema={newBookmarkSchema}
          onSubmit={(values) => {
            handleSubmission(values)
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            dirty,
          }) => (
            <>
              <View style={styles.inputGroup}>
                <TextInput
                  placeholder='Title'
                  value={values.title}
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  keyboardType='numeric'
                  maxLength={30}
                  style={styles.inputField} 
                />

                {errors.title && touched.title && (
                  <Text style={{color:'red'}}>{errors.title}</Text>
                )}
            </View>

            <View style={styles.inputGroup}>
                <TextInput
                    placeholder='Url'
                    value={values.url}
                    onChangeText={handleChange('url')}
                    onBlur={handleBlur('url')}
                    style={styles.inputField} 
                />

                {errors.url && touched.url && (
                    <Text style={{color:'red'}}>{errors.url}</Text>
                )}
                </View>

                <View style={styles.inputGroup}>
                    <Row justifyContent='space-between'>
                        <Picker aria-disabled={newCategory}
                            style={[styles.inputField,{width:Dimensions.get('window').width-120}]}
                            testID="basic-picker"
                            selectedValue={values.category}
                            onValueChange={handleChange('category')}
                            accessibilityLabel="Select Category">
                            {categories&&categories.map((item, index)=><Item key={index} label={item} value={item} />)}
                        </Picker>
                        <TouchableOpacity onPress={()=>setNewCategory(!newCategory)} style={styles.inputField}><Text>{newCategory?'-':'+'}</Text></TouchableOpacity>
                    </Row>
                </View>

                {newCategory &&
                <View style={styles.inputGroup}>
                    <TextInput 
                    placeholder='New Category Name' 
                    style={styles.inputField}
                    value={values.newCategory}
                    onChangeText={handleChange('newCategory')}
                    onBlur={handleBlur('newCategory')}
                     />
                </View>}

                <Gap size={100} />
                <Row justifyContent='space-between'>
                    <Button onPress={handleCancel} title='Cancel'/>
                    <Button onPress={()=>handleSubmit()} title='Save'/>
                </Row>
            </>
          )}
        </Formik>
    </>
  );
};

const styles = StyleSheet.create({
    inputField: {
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        fontSize: 14,
        paddingVertical:10,
      },
    inputGroup:{
        marginBottom:20
    }
});
